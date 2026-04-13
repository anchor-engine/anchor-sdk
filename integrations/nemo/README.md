# NeMo Guardrails Integration: Anchor AI

This directory contains the necessary files to integrate the **Anchor AI Intent Preservation Layer** into [NVIDIA NeMo Guardrails](https://github.com/NVIDIA/NeMo-Guardrails).

## Integration Overview

Anchor provides high-fidelity grounding scores (HHEM-2.1) in real-time. This integration allows you to use Anchor as a "rail" to monitor bot responses for factual drift and hallucinations.

### 1. The Action (`actions.py`)
Provides the `check_anchor_drift` action. It sends the bot's response and the relevant context to the Anchor API for scoring.

### 2. The Rail (`config.co`)
Defines the Colang flows to trigger Anchor. You can use it as an output rail to block/correct hallucinations before the user sees them.

## Setup

1.  Set your `ANCHOR_API_KEY` in your environment variables.
2.  Add `actions.py` to your NeMo Guardrails configuration's `actions/` directory.
3.  Include `config.co` in your rails configuration.

## Contribution / Pull Request Instructions

To submit this integration to the official NeMo Guardrails repository:

1.  **Fork** the [NVIDIA/NeMo-Guardrails](https://github.com/NVIDIA/NeMo-Guardrails) repository.
2.  **Clone** your fork and create a new branch: `feature/anchor-integration`.
3.  **Copy Files**:
    - Place `actions.py` in `nemoguardrails/library/hallucination/anchor/actions.py`.
    - Register the action in `nemoguardrails/library/hallucination/anchor/__init__.py`.
4.  **Tests**: Add a unit test in `tests/test_hallucination_rails.py`.
5.  **Documentation**: Add a section to the `docs/user_guides/` for third-party integrations.
6.  **Submit PR**: Push to your fork and create a Pull Request against the `develop` branch.
