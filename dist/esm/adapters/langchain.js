import { BaseCallbackHandler } from "@langchain/core/callbacks/base";
import { AnchorDriftError } from "../errors";
export class LangChainAnchorCallback extends BaseCallbackHandler {
    constructor(config) {
        super();
        this.name = "anchor_drift_monitor";
        this.anchor = config.anchor;
        this.contractId = config.contractId;
    }
    /**
     * Called when a tool starts running.
     * This is where we intercept the action and score it against the Anchor contract.
     */
    async handleToolStart(tool, input, runId, parentRunId, tags, metadata) {
        const action = {
            type: tool.id[tool.id.length - 1],
            target: metadata?.target || "tool_call",
            content: input,
        };
        const result = await this.anchor.score(action, this.contractId);
        if (!result.allow && !result.corrected) {
            const message = result.intervention?.message ?? "Drift detected";
            throw new AnchorDriftError(message, result);
        }
        // Note: LangChain callbacks are diagnostic. 
        // To support auto-correction, we recommend using Anchor.watch() on the toolset or agent executor.
    }
}
