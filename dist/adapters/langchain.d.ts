import { BaseCallbackHandler } from "@langchain/core/callbacks/base";
import { Serialized } from "@langchain/core/load/serializable";
import { Anchor } from "../index";
export declare class LangChainAnchorCallback extends BaseCallbackHandler {
    name: string;
    private anchor;
    private contractId;
    constructor(config: {
        anchor: Anchor;
        contractId: string;
    });
    /**
     * Called when a tool starts running.
     * This is where we intercept the action and score it against the Anchor contract.
     */
    handleToolStart(tool: Serialized, input: string, runId: string, parentRunId?: string, tags?: string[], metadata?: Record<string, any>): Promise<void>;
}
