const { Anchor } = require('./dist/cjs/index');

async function runLiveTest() {
  console.log('--- STARTING LIVE SYSTEM TEST ---');
  
  // 1. Initialize with the Dev Bypass Key
  const anchor = new Anchor({ 
    apiKey: 'anchor_invalid_key_test'
  });

  try {
    console.log('Step 1: Creating an Intent Contract...');
    const contract = await anchor.contract({
      task: "Summarize a news article about space exploration accurately. Do not mention political candidates."
    });
    console.log('SUCCESS: Contract created with ID:', contract.id);

    console.log('\nStep 2: Scoring a valid action...');
    const action = {
      type: 'summarize',
      target: 'space_news',
      content: 'NASA is planning a new mission to Mars using the Artemis rocket system.'
    };

    const result = await anchor.score(action, contract.id);
    console.log('SUCCESS: Scoring Complete!');
    console.log('Scoring Result:', JSON.stringify(result, null, 2));

    if (result.passed) {
      console.log('\nFINAL VERDICT: THE SDK IS FULLY FUNCTIONAL.');
    } else {
      console.log('\nFINAL VERDICT: SDK works, but action triggered drift (expected behavior if score < threshold).');
    }

  } catch (error) {
    console.error('SYSTEM FAILURE:', error.message);
    process.exit(1);
  }
}

runLiveTest();
