export class AnchorError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AnchorError';
    }
}
export class AnchorDriftError extends AnchorError {
    constructor(message, result) {
        super(message);
        this.name = 'AnchorDriftError';
        this.result = result;
    }
}
