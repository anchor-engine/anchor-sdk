import { AnchorError, AnchorDriftError } from './errors';
export * from './types';
export * from './errors';
export class Anchor {
    constructor(config) {
        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl ?? 'https://anchor-app-one.vercel.app';
    }
    get headers() {
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
    async contract(options) {
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
        return res.json();
    }
    /**
     * Score an agent action against an intent contract.
     * Handles drift detection, sequential consistency, and auto-correction.
     * @param action The action performed by the agent.
     * @param contractId The ID of the intent contract to score against.
     * @returns The scoring result and any necessary interventions.
     */
    async score(action, contractId) {
        const res = await fetch(`${this.baseUrl}/api/monitor`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({ contract_id: contractId, action }),
        });
        if (!res.ok) {
            throw new AnchorError(`Score failed: ${res.status} ${res.statusText}`);
        }
        return res.json();
    }
    /**
     * Watch an agent session by automatically intercepting 'execute', 'run', or 'act' methods.
     * @param session The agent session or object to proxy.
     * @param contractId The ID of the intent contract to monitor against.
     * @returns A proxied version of the session that enforces the contract.
     */
    watch(session, contractId) {
        const self = this;
        return new Proxy(session, {
            get(target, prop) {
                const val = target[prop];
                if (typeof val === 'function' && (prop === 'execute' || prop === 'run' || prop === 'act')) {
                    return async (action, ...args) => {
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
