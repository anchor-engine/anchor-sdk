import { AnchorConfig, ContractOptions, AgentAction, ScoreResult, IntentContract } from './types';
export * from './types';
export * from './errors';
export declare class Anchor {
    private baseUrl;
    private apiKey;
    constructor(config: AnchorConfig);
    private get headers();
    /**
     * Create an intent contract from a plain language task description.
     * @param options Contract configuration and task description.
     * @returns The created IntentContract.
     */
    contract(options: ContractOptions): Promise<IntentContract>;
    /**
     * Score an agent action against an intent contract.
     * Handles drift detection, sequential consistency, and auto-correction.
     * @param action The action performed by the agent.
     * @param contractId The ID of the intent contract to score against.
     * @returns The scoring result and any necessary interventions.
     */
    score(action: AgentAction, contractId: string): Promise<ScoreResult>;
    /**
     * Watch an agent session by automatically intercepting 'execute', 'run', or 'act' methods.
     * @param session The agent session or object to proxy.
     * @param contractId The ID of the intent contract to monitor against.
     * @returns A proxied version of the session that enforces the contract.
     */
    watch<T extends object>(session: T, contractId: string): T;
}
export default Anchor;
