export interface AnchorConfig {
    apiKey: string;
    baseUrl?: string;
}
export interface ContractOptions {
    task: string;
    onDrift?: 'log' | 'warn' | 'block' | 'correct';
    driftThreshold?: number;
    sequentialThresholds?: {
        anchor?: number;
        predecessor?: number;
    };
    personaId?: string;
    knowledgeBaseId?: string;
}
export interface AgentAction {
    type: string;
    target?: string;
    content?: string;
    [key: string]: any;
}
export interface ScoreResult {
    allow: boolean;
    score: number;
    original_score?: number;
    anchor_triggered: boolean;
    corrected: boolean;
    action: AgentAction;
    intervention?: {
        type: string;
        message: string;
        explanation?: string;
    };
}
export interface IntentContract {
    id: string;
    task: string;
    on_drift: string;
    status: string;
    created_at: string;
}
