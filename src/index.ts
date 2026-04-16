import {
  AnchorConfig,
  ContractOptions,
  AgentAction,
  ScoreResult,
  IntentContract,
} from './types';
import { AnchorError, AnchorDriftError } from './errors';

export * from './types';
export * from './errors';

export class Anchor {
  private baseUrl: string;
  private apiKey: string;

  constructor(config: AnchorConfig) {
    if (!config.apiKey || config.apiKey.trim() === '') {
      throw new AnchorError(
        'Missing ANCHOR_API_KEY. Please sign up at https://anchor-app-one.vercel.app to get your free API key.'
      );
    }
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl ?? 'https://anchor-app-one.vercel.app';
  }

  private get headers() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Create an intent contract from a plain language task description.
   * @param options Contract configuration and task description.
   * @returns The created IntentContract.
   */
  async contract(options: ContractOptions): Promise<IntentContract> {
    const res = await fetch(`${this.baseUrl}/api/contracts`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        task: options.task,
        on_drift: options.onDrift ?? 'warn',
        drift_threshold: options.driftThreshold ?? 0.7,
        sequential_thresholds: options.sequentialThresholds ?? {
          anchor: 0.65,
          predecessor: 0.55,
        },
        persona_id: options.personaId,
        knowledge_base_id: options.knowledgeBaseId,
      }),
    });

    if (!res.ok) {
      throw new AnchorError(`Contract creation failed: ${res.status} ${res.statusText}`);
    }

    return res.json() as Promise<IntentContract>;
  }

  /**
   * Score an agent action against an intent contract.
   * Handles drift detection, sequential consistency, and auto-correction.
   * @param action The action performed by the agent.
   * @param contractId The ID of the intent contract to score against.
   * @returns The scoring result and any necessary interventions.
   */
  async score(action: AgentAction, contractId: string): Promise<ScoreResult> {
    const res = await fetch(`${this.baseUrl}/api/monitor`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ contract_id: contractId, action }),
    });

    if (!res.ok) {
      throw new AnchorError(`Score failed: ${res.status} ${res.statusText}`);
    }

    return res.json() as Promise<ScoreResult>;
  }

  /**
   * Watch an agent session by automatically intercepting 'execute', 'run', or 'act' methods.
   * @param session The agent session or object to proxy.
   * @param contractId The ID of the intent contract to monitor against.
   * @returns A proxied version of the session that enforces the contract.
   */
  watch<T extends object>(session: T, contractId: string): T {
    const self = this;
    return new Proxy(session, {
      get(target: any, prop: string) {
        const val = target[prop];
        if (typeof val === 'function' && (prop === 'execute' || prop === 'run' || prop === 'act')) {
          return async (action: AgentAction, ...args: any[]) => {
            const result = await self.score(action, contractId);
            
            if (!result.allow && !result.corrected) {
              const message = result.intervention?.message ?? 'Drift detected';
              throw new AnchorDriftError(message, result);
            }

            // If corrected, use the corrected action instead of the original
            const finalAction = result.corrected ? result.action : action;
            return val.apply(target, [finalAction, ...args]);
          };
        }
        return val;
      },
    });
  }
}

export default Anchor;
