import { Anchor } from '@anchor-engine/sdk';
import { LangChainAnchorCallback } from '@anchor-engine/sdk/adapters/langchain';
// Example mocks LangChain agents. In a real environment, you would import LangChain tools here.

// 1. Initialize Anchor
const anchor = new Anchor({ 
  apiKey: process.env.ANCHOR_API_KEY || ''
});

async function runLangChainExample() {
  // 2. Establish the guardrail contract
  const contract = await anchor.contract({
    task: "Assist user with technical support inquiries. Do not provide billing information or issue refunds.",
    onDrift: 'block'
  });

  // 3. Create the callback handler, linking it to your contract
  const anchorCallback = new LangChainAnchorCallback({
    anchor,
    contractId: contract.id
  });

  console.log(`Anchor Callback initialized for Contract: ${contract.id}`);
  
  // 4. Attach this callback to your LangChain Agent or Tool
  // Example usage (pseudo-code):
  // const agent = initializeAgent({
  //   tools,
  //   llm,
  //   agentType: "chat-conversational-react-description",
  //   callbacks: [anchorCallback] // <-- Attach here
  // });
  
  // The agent runs. If the agent attempts to output billing info or use a refund tool,
  // the callback will throw an AnchorDriftError before the tool executes.
  console.log('Ready to safeguard LangChain agent execution.');
}

runLangChainExample().catch(e => {
  if (e instanceof Error) console.error(e.message);
});
