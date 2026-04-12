import { BaseCallbackHandler } from "@langchain/core/callbacks/base";
import { Serialized } from "@langchain/core/load/serializable";
import { Anchor } from "../index";
import { AgentAction, ScoreResult } from "../types";
import { AnchorDriftError } from "../errors";

export class LangChainAnchorCallback extends BaseCallbackHandler {
  name = "anchor_drift_monitor";
  private anchor: Anchor;
  private contractId: string;

  constructor(config: { anchor: Anchor; contractId: string }) {
    super();
    this.anchor = config.anchor;
    this.contractId = config.contractId;
  }

  /**
   * Called when a tool starts running.
   * This is where we intercept the action and score it against the Anchor contract.
   */
  async handleToolStart(
    tool: Serialized,
    input: string,
    runId: string,
    parentRunId?: string,
    tags?: string[],
    metadata?: Record<string, any>
  ): Promise<void> {
    const action: AgentAction = {
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
