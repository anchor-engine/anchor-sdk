# @anchor-engine/sdk

[![npm version](https://img.shields.io/npm/v/@anchor-engine/sdk.svg?style=flat-square)](https://www.npmjs.com/package/@anchor-engine/sdk)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/anchor-ai/sdk/blob/main/LICENSE)

**Anchor** is an open-source intent preservation layer for LLM agents. It monitors agent actions in real-time, detecting and correcting "intent drift" before it leads to hallucinations or out-of-bounds behavior.

> [!IMPORTANT]
> **Validated Performance (CNN/DailyMail Benchmark)**:
> - **+9.2% High-Fidelity Lift**: Significantly improves the grounding of agent-generated summaries.
> - **0% IFEval Regression**: Zero impact on instruction-following capabilities.
> - **0% Tau2 Regression**: Maintains absolute stability in sequential reasoning.

---

## Quickstart

Add Anchor to any AI agent project in just three lines of code.

### 1. Install

```bash
npm install @anchor-engine/sdk
```

### 2. Guard Your Agent

```typescript
import { Anchor } from '@anchor-engine/sdk';

// 1. Initialize with your API key
const anchor = new Anchor({ apiKey: process.env.ANCHOR_API_KEY });

// 2. Define an intent contract for the task
const contract = await anchor.contract({ 
  task: "Build the project in /projects/myapp only. Do not touch core library files." 
});

// 3. Score agent actions in real-time
const result = await anchor.score(agentAction, contract.id);

if (!result.allow) {
  console.log(`Action blocked: ${result.intervention.message}`);
}
```

---

## Features

- **Real-time Drift Monitoring**: Catch hallucinations the moment they occur.
- **Auto-Correction (Critique Loop)**: Automatically rewrites drifted actions to stay within contract scope.
- **Framework Native**: First-class support for LangChain, Claude Code, and more.
- **Zero Latency Overhead**: Asynchronous monitoring keeps your agents fast.

## Adapters

### LangChain
```typescript
import { LangChainAnchorCallback } from '@anchor-engine/sdk/adapters/langchain';

const executor = await initializeAgentExecutorWithOptions(tools, model, {
  callbacks: [new LangChainAnchorCallback({ anchor, contractId: contract.id })],
});
```

### Claude Code / Generic Interception
Use the `watch()` proxy to automatically wrap any agent object:
```typescript
const guardedAgent = anchor.watch(myAgent, contract.id);

// Automatically scores every .act(), .run(), or .execute() call
await guardedAgent.act({ type: 'file_write', target: '/src/main.ts', ... });
```

---

## Benchmarks & Research

Anchor is based on research into real-time intent enforcement. Our latest benchmark on the **CNN/DailyMail** corpus with `gemma4:31b-cloud` shows a **9.2% net increase** in high-fidelity grounding.

Read the full technical report: [TECHNICAL_REPORT.md](./TECHNICAL_REPORT.md)

## Citation

If you use Anchor in your research or project, please cite:

```bibtex
@techreport{rahman2026anchor,
  title={Anchor: Real-Time Intent Preservation in LLM Agents},
  author={Rahman, Hasin},
  year={2026},
  url={https://github.com/anchor-engine/anchor-sdk}
}
```

---

## License

MIT © [Anchor AI](https://github.com/anchor-ai)
