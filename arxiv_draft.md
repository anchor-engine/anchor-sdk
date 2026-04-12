# Anchor: A Real-Time Intent Preservation Layer for Agentic LLM Hallucination Reduction

**Authors**: Hasin Rahman (Anchor AI), [Contributor Name]
**Date**: April 2026
**Status**: DRAFT (v0.1.0)

## Abstract
Large Language Model (LLM) agents often suffer from "intent drift"—a cumulative loss of instructional grounding during long-running or entity-dense tasks. We present **Anchor**, an open-source inference-time monitoring engine that enforces developer intent through a high-fidelity grounding threshold. Benchmarked on the CNN/DailyMail news corpus using a Gemma 4 31B backbone, Anchor demonstrates a **9.2% increase in high-fidelity grounding** (HHEM >= 0.95) with zero regression in general instruction-following (IFEval) or sequential stability (Tau2). Anchor provides a lightweight, framework-agnostic middleware for safety-critical agent deployments.

## 1. Introduction
The drift from user instructions to agentic hallucinations is a primary barrier to LLM adoption in enterprise environments. Current solutions rely heavily on post-hoc evaluation or expensive oversight models. Anchor introduces a real-time "Rescue Loop" that critiques agent actions before they are executed. 

## 2. Experimental Results: CNN/DailyMail
We validated Anchor's performance on 200 high-complexity articles from the CNN/DailyMail dataset.

| Metric | Baseline (Gemma 4 31B) | Anchor (Gemma 4 31B + Anchor) | Lift |
| :--- | :--- | :--- | :--- |
| **High-Fidelity (HHEM >= 0.95)** | 47.1% | 56.3% | **+9.2%** |
| **Hallucination Rate (< 0.50)** | 0.8% | 0.7% | -0.1% |
| **Intent Preservation (Tau2)** | 1.00 | 1.00 | 0.0% |

## 3. The "Rescue Loop" Mechanics
Anchor triggers when the HHEM grounding score falls below a set sensitivity threshold (default: 0.96). Upon detection, the "Critique Loop" rewrites the drifted action using the original intent contract as a reference, resulting in a net average score gain of **+0.0362** per intervention.

---
*Follow the development at [github.com/anchor-engine/anchor-sdk](https://github.com/anchor-engine/anchor-sdk)*
