"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnchorDriftError = exports.AnchorError = void 0;
class AnchorError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AnchorError';
    }
}
exports.AnchorError = AnchorError;
class AnchorDriftError extends AnchorError {
    constructor(message, result) {
        super(message);
        this.name = 'AnchorDriftError';
        this.result = result;
    }
}
exports.AnchorDriftError = AnchorDriftError;
