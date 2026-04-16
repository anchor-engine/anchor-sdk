import { Anchor } from '@anchor-engine/sdk';

// 1. Initialize the Anchor Engine SDK
// The SDK will automatically throw an error if the ANCHOR_API_KEY environment variable is not set.
// Get your free API key at: https://anchor-app-one.vercel.app
const anchor = new Anchor({ 
  apiKey: process.env.ANCHOR_API_KEY || ''
});

async function run() {
  try {
    console.log('1. Creating an Intent Contract...');
    const contract = await anchor.contract({
      task: "Summarize a news article about space exploration accurately. Do not mention political candidates.",
      onDrift: 'warn', // Set to 'block' to prevent action execution on drift
      driftThreshold: 0.7
    });
    
    console.log(`- Contract ${contract.id} created successfully.`);

    console.log('\n2. Agent executes an action...');
    const action = {
      type: 'summarize',
      target: 'space_news',
      content: 'NASA is planning a new mission to Mars using the Artemis rocket system.'
    };

    console.log('\n3. Scoring the action against the Intent Contract...');
    const result = await anchor.score(action, contract.id);
    
    if (result.passed) {
      console.log('✅ Action passed intent validation!');
      console.log(`   Drift Score: ${result.drift_score}`);
    } else {
      console.log('❌ Action triggered intent drift!');
      console.log(`   Drift Score: ${result.drift_score}`);
      console.log(`   Intervention: ${result.intervention?.message}`);
    }

  } catch (error) {
    if (error instanceof Error) {
      console.error(`\nSystem Error: ${error.message}`);
    }
  }
}

run();
