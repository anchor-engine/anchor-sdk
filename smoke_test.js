const { Anchor } = require('./dist/cjs/index');

console.log('--- STARTING SMOKE TEST: MISSING API KEY ---');

try {
  console.log('Attempting to initialize Anchor with empty string...');
  const anchor = new Anchor({ apiKey: '' });
  console.log('FAILURE: SDK allowed initialization without API key.');
} catch (error) {
  console.log('SUCCESS: SDK threw an error as expected!');
  console.log('ERROR MESSAGE:', error.message);
}

console.log('\n--- STARTING SMOKE TEST: MISSING CONFIG ---');

try {
  console.log('Attempting to initialize Anchor with undefined...');
  const anchor = new Anchor({});
  console.log('FAILURE: SDK allowed initialization with empty config.');
} catch (error) {
  console.log('SUCCESS: SDK threw an error as expected!');
  console.log('ERROR MESSAGE:', error.message);
}

console.log('\n--- SMOKE TEST COMPLETE ---');
