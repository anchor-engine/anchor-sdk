# Anchor AI Launch Assets

These assets are designed to maximize developer engagement and drive GitHub stars for the `@anchor-engine/sdk` launch.

---

## 1. HuggingFace Announcement (Technical)

We're releasing Anchor, an inference-time monitoring engine that reduces hallucinations in multi-step agent workflows.

Instead of post-hoc evaluation, Anchor scores every agent action against a persistent intent contract using a grounding threshold. When drift is detected, a critique loop automatically rewrites the action before it executes.

**Benchmarks on CNN/DailyMail (Gemma 4 31B, scored with HHEM-2.1-Open):**
- +9.2% increase in high-fidelity grounding (HHEM ≥ 0.95)
- 3:1 ratio of successful rescues to degradations across 204 interventions
- 0% regression on IFEval instruction-following (541 prompts)
- 0% regression on Tau2 task completion

Works with LangChain, NeMo Guardrails, or any custom agent proxy. MIT license, zero heavy dependencies.

GitHub: https://github.com/anchor-engine/anchor-sdk
NPM: `npm install @anchor-engine/sdk`
Sign up: https://anchor-app-one.vercel.app/

---

## 2. LinkedIn Post (Professional/Technical)

The biggest reliability problem in production LLM agents isn't a single bad response — it's cumulative drift. Over multiple steps, agents gradually lose fidelity to their original instructions.

Today I'm releasing Anchor v0.1.0, an open-source inference-time monitoring engine built to solve this.

**How it works:**
Anchor wraps your agent with a persistent intent contract. Every action the agent takes is scored against that contract using HHEM-2.1-Open, Vectara's hallucination evaluation model. When the score drops below threshold, Anchor's critique loop rewrites the action to restore grounding before it executes.

**Benchmarks (Gemma 4 31B, CNN/DailyMail corpus):**
- +9.2% lift in high-fidelity grounding
- 3:1 successful rescue ratio across 204 triggered interventions
- 0% regression in instruction following (IFEval, 541 prompts)
- 0% regression in task completion (Tau2, airline + retail)

The SDK is 3 lines of code, ships with native adapters for LangChain and NVIDIA NeMo Guardrails, and is MIT licensed.

GitHub: https://github.com/anchor-engine/anchor-sdk
NPM: `npm install @anchor-engine/sdk`
Sign up: https://anchor-app-one.vercel.app/

#OpenSource #AIAgents #LLM #GenerativeAI #MachineLearning

---

## 3. Product Hunt Launch

**Tagline**: Stop your AI agents from drifting — 3 lines of code.

**Description**:
Multi-step AI agents drift. They start with clear instructions and gradually lose fidelity — producing hallucinations that are hard to catch until damage is done.

Anchor is an open-source inference-time monitoring engine that fixes this. It scores every agent action against a persistent intent contract and automatically rewrites drifted actions via a critique loop before they execute.

Benchmarked on CNN/DailyMail with Gemma 4 31B: +9.2% faithfulness lift, 3:1 rescue ratio, 0% regression on instruction following. MIT license, works with LangChain and NeMo Guardrails.

Get your free API key at: https://anchor-app-one.vercel.app/

---

## Launch Strategy

1. **HuggingFace first** — Technical audience, high signal-to-noise.
2. **LinkedIn second**.
3. **Product Hunt last** (Wait for ~10 GitHub stars first).
