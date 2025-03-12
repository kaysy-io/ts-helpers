import { STATUS_CODES } from 'http';

export class Exception extends Error {
    public statusCode: number;
    public payload: any = {};

    constructor(message: string, status: number = 500, data: any = {}) {
        super(message);

        this.payload = data;
        this.statusCode = status;
    }

    /**
     * Sets the payload to be send with error data
     *
     * @param payload
     * @returns
     */
    public setPayload(payload: any = {}): this {
        this.payload = payload;

        return this;
    }

    /**
     * Returns the error response to be send to the client
     *
     * @returns
     */
    public toObject() {
        return {
            statusCode: this.statusCode,
            error: STATUS_CODES[this.statusCode + ''],
            message: this.message,
            data: this.payload,
        };
    }
}
