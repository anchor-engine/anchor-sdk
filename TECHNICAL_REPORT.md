# Anchor Technical Report: Real-Time Intent Preservation in LLM Agents

**Author**: Hasin Rahman  
**Date**: April 2026  
**Repository**: [github.com/anchor-engine/anchor-sdk](https://github.com/anchor-engine/anchor-sdk)

## 1. Abstract
We introduce **Anchor**, an open-source inference-time monitoring engine designed to mitigate "intent drift" in agentic Large Language Models (LLMs). By coupling a high-fidelity grounding monitor (HHEM-2.1) with an active Critique Loop, Anchor enforces instructional grounding in real-time. Our evaluation on the CNN/DailyMail corpus demonstrates a **9.2% increase** in high-fidelity output (score >= 0.95), while maintaining zero regression on standard benchmarks (IFEval, Tau2).

## 2. Introduction
Intent drift occurs when an LLM agent, while executing a multi-step task, cumulatively loses adherence to its original system instructions. This leads to hallucinations, entity errors, and out-of-bounds actions. Anchor acts as a middleware layer that "anchors" the agent to its original intent contract.

## 3. Methodology: The Wait-and-Rescue (W&R) Loop
Anchor operates on a 3-stage pipeline:
1.  **Drift Monitor**: Every agent action is scored against the active intent contract using a grounding model. 
2.  **Trigger**: If the grounding score falls below the sensitivity threshold (default $T=0.96$), the action is paused.
3.  **Active Critique**: A "Rescue Loop" prompts the model to rewrite its last action, specifically highlighting the detected drift.

## 4. Quantitative Results

### 4.1. Comparison across Datasets: The "Ceiling Effect"
Our initial tests on simple datasets (Wikipedia) showed minimal impact, revealing a "Ceiling Effect" where frontier models already perform near-optimally. Moving to complex news summaries (CNN/DailyMail) exposed significant drift, allowing Anchor to demonstrate its utility.

| Dataset | Baseline (HHEM >= 0.95) | Anchor (HHEM >= 0.95) | Impact (Lift) |
| :--- | :--- | :--- | :--- |
| **Wikipedia Intros** | 51.5% | 52.7% | +1.2% |
| **CNN/DailyMail** | 47.1% | 56.3% | **+9.2%** |

### 4.2. Stability Benchmarks
Crucially, Anchor provides these gains without penalizing the agent's general intelligence.

- **IFEval (Instruction Following)**: 0% Regression.
- **Tau2 (Agentic Stability)**: 1.00 score maintained.

## 5. Qualitative Case Study: "The Duke Rescue"
In a trial using `gemma4:31b-cloud`, the model drifted while summarizing a complex news article about a campus incident.

*   **Original Score**: 0.67 (Drifting/Generalizing)
*   **Anchored Score**: 0.88 (Factually Grounded)
*   **Original Output**: *"A student union incident involving a rope resulted in campus unrest and presidential forums at Duke..."*
*   **Anchored Output**: *"A Duke student admitted to hanging a rope noose from a tree near a student union and is no longer on campus... The incident led to protests and a forum with President Richard Brodhead..."*

Anchor detected the low grounding score and forced the model to include the specific, factual details it had begun to omit.

## 6. Discussion: The Safety-First Trade-off
Analysis of Anchor's interventions shows a **3:1 Improvement Ratio**:
- **52.9%** of interventions resulted in a superior score.
- **17.2%** resulted in a degradation (over-correction).
- **29.9%** remained statistically equivalent.

We argue that in safety-critical deployments (Finance, Legal, Infrastructure), an over-cautious monitor that favors grounding over brevity is the preferred failure mode.

## 7. Conclusion
Anchor provides a necessary guardrail for the next generation of autonomous agents. By formalizing intent into a monitored contract, we move closer to verifiable AI agency.

---

### Citation
```bibtex
@techreport{rahman2026anchor,
  title={Anchor: Real-Time Intent Preservation in LLM Agents},
  author={Rahman, Hasin},
  institution={Anchor AI / Independent Research},
  year={2026},
  url={https://github.com/anchor-engine/anchor-sdk}
}
```
