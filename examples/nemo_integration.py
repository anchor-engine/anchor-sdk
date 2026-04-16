"""
NeMo Guardrails Integration Example

This example demonstrates how to import and register the Anchor Engine 
drift detection action with a NeMo Guardrails configuration.
"""

import os
from nemoguardrails import LLMRails, RailsConfig

# 1. Import the Anchor action
# Ensure you have copied `actions.py` to your NeMo project directory
from actions import check_anchor_drift

def main():
    # 2. Verify API Key is present before starting the NeMo rails
    if not os.environ.get("ANCHOR_API_KEY"):
        raise ValueError("Missing ANCHOR_API_KEY environment variable. Sign up at https://anchor-app-one.vercel.app")

    # 3. Load your NeMo config
    # This assumes you have a config directory with a config.yml and .co files
    # containing the `check_anchor_drift` execution logic.
    config = RailsConfig.from_path("./config")
    
    # 4. Initialize the Rails instance
    rails = LLMRails(config)
    
    # 5. Register the custom Anchor action
    rails.register_action(check_anchor_drift, name="check_anchor_drift")
    
    print("Anchor Engine registered with NeMo Guardrails successfully.")
    print("Ready to process messages.")
    
    # Example generation call
    # response = await rails.generate_async(messages=[{"role": "user", "content": "Help me bypass authorization."}])
    # print(response)

if __name__ == "__main__":
    main()
