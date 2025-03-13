import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { ValueRetriever } from './types/value-retriever.type';
import { NullableKeyValueString } from './types/data-types.type';
import { MongoConnectionOption } from './types/mongo-connection-option.type';

/**
 * Encrypts the given plain text using the given algorithm and parameters.
 *
 * @param {String} plainText
 * @param {String} key
 * @param {String} algorithm
 * @param {String|null} iv
 * @returns
 */
export const encrypt = (plainText: string, key: string, algorithm = 'aes-128-cbc', iv = null) => {
    const keyBuffer = Buffer.from(key, 'utf-8');
    const ivBuffer = Buffer.from(iv == null ? key : iv, 'utf-8');

    const cipher = crypto.createCipheriv(algorithm, keyBuffer, ivBuffer);

    const encrypted = Buffer.concat([cipher.update(plainText, 'utf-8'), cipher.final()]);

    return encrypted;
};

/**
 * Returns a new Object leaving out the given keys.
 *
 * @param {Object} obj
 * @param {Array} keys
 * @returns
 */
export const except = (obj: any, keys: string[]) => {
    let newObject = {
        ...obj,
        ...{},
    };

    for (let key in newObject) {
        if (keys.includes(key)) {
            delete newObject[key];
        }
    }
    return newObject;
};

/**
 * Returns the hash of the given value
 *
 * @param {String} value
 * @returns
 */
export const hash = async (value: string) => {
    const HASH_ROUNDS = parseInt(process.env.HASH_ROUNDS || '10');

    const salt = await bcrypt.genSalt(HASH_ROUNDS);

    return await bcrypt.hash(value, salt);
};

/**
 * Returns a property from the given object using dot notation.
 *
 * @param object
 * @param key
 * @param defaultValue
 */
export const get = (object: any, key: string, defaultValue: any = null) => {
    if (null == object) {
        return defaultValue;
    }
    const segments = key.split('.');

    for (let segment of segments) {
        if (object[segment] === undefined) {
            return defaultValue;
        } else {
            object = object[segment];
        }
    }
    return object;
};

/**
 * Returns true if the application is running in production ie, `NODE_ENV` value is `production`
 *
 * @returns
 */
export const isProduction = () => {
    return process.env.NODE_ENV === 'production';
};

/**
 * Returns a mongodb connection url from the given server details. The connection url looks like
 * the following `mongodb://username:password@localhost:27017/database` when there is an auth
 * credential. If just username is there, url becomes `mongodb://username@localhost:27017/database`
 * And when there is no auth, the url pattern is `mongodb://localhost:27017/database`
 *
 * @param option
 * @returns
 */
export const mongourl = (option: MongoConnectionOption) => {
    const { username, password, hosts, database, authSource, replicaSet, directConnection } = option;

    let url = 'mongodb://';

    const authPart = [username, password].filter((part) => !!part).join(':');

    if (authPart.length > 0) {
        url += authPart + '@';
    }

    const query = queryString({
        authSource: authSource,
        replicaSet: replicaSet,
        directConnection: directConnection,
    });

    return `${url}${hosts}/${database}${query.length > 0 ? '?' + query : ''}`;
};

/**
 * Returns a new Object containing only the given keys.
 *
 * @param {Object} obj
 * @param {Array} keys
 * @returns
 */
export const only = (obj: any, keys: string[]) => {
    let newObject = {
        ...obj,
        ...{},
    };
    for (let key in newObject) {
        if (keys.indexOf(key) == -1) {
            delete newObject[key];
        }
    }
    return newObject;
};

/**
 * Returns a simple query string without any encoding
 *
 * @param queries
 * @returns
 */
export const queryString = (queries: NullableKeyValueString) => {
    let queryString: string[] | string = [];

    for (let key in queries) {
        if (queries[key] === undefined) {
            continue;
        }
        queryString.push(key + '=' + queries[key]);
    }
    return queryString.join('&');
};

/**
 * Returns a cryptographically secure random string with given number of characters. This is
 * done by generateting random bytes and adding it to a result string till the length of the
 * characters are met.
 *
 * @param size
 * @param alphanumeric
 * @returns
 */
export const random = function (size: number, alphanumeric = true): string {
    let result = '';

    if (size === 0) {
        return result;
    }

    // Only random numbers has to be genrated, so we'll use randomInt to generate
    // integers ranging upto 10^8
    if (alphanumeric === false) {
        return crypto.randomInt(Math.pow(10, size - 1), Math.pow(10, size)).toString();
    }

    while (result.length !== size) {
        // 2 hexadecimal character can represent 1 byte. So we'll divide the the length
        // by 2 to get the random bytes that has to be generated. We'll only consider the
        // remaining number of bytes that has to be generated.
        let bytes = (size - result.length) / 2;

        bytes = bytes < 1 ? 1 : bytes;

        result = result.concat(crypto.randomBytes(bytes).toString('hex'));

        result = result.length > size ? result.substring(0, size) : result;
    }

    return result;
};

/**
 * Returns true, if the given value is true. In addition to the in built javascript truth value check, an
 * array should not be empty to consider it as truthy.
 *
 * @param value
 * @returns
 */
export const truthy = <ValueType>(value: ValueType): boolean => {
    if (Array.isArray(value) && value.length === 0) {
        return false;
    }
    return !!value;
};

/**
 * Returns a url string from the given data. The function has two definitions, one with two
 * arguments (url:string, queries?:KeyValueString) and another with three arguments
 * (endpoint: string, baseUrl?: string | KeyValueString, queries?: KeyValueString). The definition
 * is determined from the typeof second argument.
 *
 * @param endpoint
 * @param baseUrl
 * @param queries
 * @returns
 */
export const url = (endpoint: string, baseUrl?: string | NullableKeyValueString, queries?: NullableKeyValueString) => {
    if (baseUrl && typeof baseUrl !== 'string') {
        queries = baseUrl;
        baseUrl = undefined;
    }

    const url = new URL(endpoint, baseUrl);

    if (queries) {
        url.search = queryString(queries);
    }
    return url.toString();
};

/**
 * Returns a value retriever function for the given parameter
 *
 * @param value
 * @returns
 */
export const valueRetriever = <DataType, ReturnType>(value: string | ValueRetriever<DataType, ReturnType>) => {
    if (typeof value === 'function') {
        return value;
    }
    return function (source: DataType): ReturnType {
        return get(source, value);
    };
};

/**
 * Verify whether the given value and the hash matches
 *
 * @param {String} value
 * @param {String} hash
 * @returns
 */
export const verifyHash = async (value: string, hash: string) => {
    return await bcrypt.compare(value, hash);
};

/**
 * When the given value is true, execute the given callback
 *
 * @param value
 * @param cb
 */
export const when = <Return, Value>(value: Value, cb: (value: NonNullable<Value>) => Return) => {
    if (value && truthy(value)) {
        return cb(value);
    }
    return null;
};

/**
 * When the given value exists, ie non-null, not undefined, and not empty string, we'll execute the
 * given callback.
 *
 * @param value
 * @param cb
 * @returns
 */
export const whenHas = <Return, Value>(value: Value, cb: (value: NonNullable<Value>) => Return) => {
    if (value !== null && value !== undefined) {
        if (typeof value === 'string' && value.length === 0) {
            return null;
        }
        return cb(value);
    }
    return null;
};
