import { ScoreResult } from './types';

export class AnchorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AnchorError';
  }
}

export class AnchorDriftError extends AnchorError {
  result: ScoreResult;

  constructor(message: string, result: ScoreResult) {
    super(message);
    this.name = 'AnchorDriftError';
    this.result = result;
  }
}
