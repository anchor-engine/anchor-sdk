import { ScoreResult } from './types';
export declare class AnchorError extends Error {
    constructor(message: string);
}
export declare class AnchorDriftError extends AnchorError {
    result: ScoreResult;
    constructor(message: string, result: ScoreResult);
}
