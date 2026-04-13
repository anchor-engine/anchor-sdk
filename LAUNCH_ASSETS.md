# Anchor AI Launch Assets

These assets are designed to maximize developer engagement and drive GitHub stars for the `@anchor-engine/sdk` launch.

---

## 1. X (Twitter) Launch Thread (5 Tweets)

### **Tweet 1: The Hook**
🚀 Today we are open-sourcing Anchor: The intent-preservation layer for LLM agents.

Hallucinations aren't just about facts—they're about *drift*. Anchor monitors developer intent in real-time and rescues agents before they go off-rails.

+9.2% Faithfulness Lift. 0% Regressions.

[GitHub Repo URL] 🧵👇

### **Tweet 2: The Problem**
Multi-step agents suffer from "cumulative drift." By step 5, the original system prompt is often a distant memory. 

Current fix? Post-hoc eval or expensive judge models. 
Better fix? Real-time ground monitoring.

Anchor scores every action against a high-fidelity grounding threshold.

### **Tweet 3: The Rescue Loop**
Anchor doesn't just block; it rescues. 

When the HHEM score (internal grounding) drops, Anchor's Critique Loop automatically rewrites the drifted action using the original intent contract.

The result? 3 out of 4 interventions result in a net gain in factual grounding.

### **Tweet 4: The 3-Line Integration**
We built this for developers. 

```typescript
import { Anchor } from '@anchor-engine/sdk';
const anchor = new Anchor({ apiKey: '...' });
const result = await anchor.score(agentAction, contractId);
```

Native support for @LangChainAI, @NVIDIA NeMo Guardrails, and custom agent proxies.

### **Tweet 5: Call to Action**
Anchor is 100% open-source (MIT). We're launching v0.1.0 today to help solve the grounding problem for the agentic era.

⭐ Star us on GitHub to support the mission: [GitHub Repo URL]
📦 Install: `npm install @anchor-engine/sdk`

---

## 2. HuggingFace Announcement

**Title**: Introducing Anchor: A Real-Time intent Preservation Layer for Agentic LLMs

**Content**:
We're excited to announce the release of **Anchor**, an open-source inference-time monitoring engine designed to reduce hallucinations in agentic workflows. 

Anchor implements a "Wait-and-Rescue" loop that couples a high-fidelity grounding monitor (HHEM-2.1) with an active critique mechanism. In our latest benchmarks on the CNN/DailyMail news corpus, Anchor documented a **+9.2% increase** in high-fidelity grounding for gemma4:31b.

- **Check out the SDK**: [github.com/anchor-engine/anchor-sdk](https://github.com/anchor-engine/anchor-sdk)
- **Read the Technical Report**: [arXiv Draft](./TECHNICAL_REPORT.md)

Happy to collaborate with the community on better intent-enforcement for autonomous agents!

---

## 3. Product Hunt Assets

**Tagline**: 3 lines of code to stop your AI agents from drifting.

**Description**:
AI agents fail when they drift away from their original instructions. Anchor is a real-time monitoring engine that enforces developer intent through high-fidelity grounding thresholds. 

- **Monitor**: Score every agent action against a persistent "intent contract."
- **Rescue**: Automatically rewrite drifted actions using a built-in critique loop.
- **Integrate**: Works with LangChain, NeMo Guardrails, or any custom agent proxy.

Stop hoping your agents follow instructions. Anchor them.
