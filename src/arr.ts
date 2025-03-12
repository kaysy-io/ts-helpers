import { valueRetriever } from './helpers';
import { ValueRetriever } from './types/value-retriever.type';
import { Comparable } from './contracts/comparable.interface';

export class Arr {
    /**
     * Duplicates the given data for the given count and returns an array.
     *
     * @param data
     * @param count
     * @returns
     */
    public static duplicate<T = any>(data: T, count: number): T[] {
        const result: T[] = [];

        for (let i = 1; i <= count; i++) {
            result.push(data);
        }

        return result;
    }

    /**
     * Returns true if the given array is empty
     *
     * @param source
     * @returns
     */
    public static empty<T = any>(source: Array<T>): boolean {
        return source.length === 0;
    }

    /**
     * Gets the first element in the array.
     *
     * @param source
     * @param defaultValue
     * @returns
     */
    public static first<T = any>(source: Array<T>, defaultValue: any = null): T {
        if (!Arr.empty(source)) {
            return source[0];
        }
        return defaultValue;
    }

    /**
     * Groups the given array by the identifier into a Map and returns it.
     *
     * @param source
     * @param identifier
     * @returns
     */
    public static groupBy<T = any, S = any>(source: Array<T>, identifier: string | ValueRetriever<T, S>) {
        const result = new Map<S, T[]>();

        const valueGetter = valueRetriever(identifier);

        for (let sourceData of source) {
            let key = valueGetter(sourceData);

            // If key is a comparable function, then we've to loop through all the keys in the map
            // and determine whether any of the key matches the current key. If a match is found,
            // we'll push the data to the matched key only and won't keep the new key.
            if (key && typeof (key as any).equals === 'function') {
                const matchingKey = Array.from(result.keys()).find((iteratingKey) => {
                    return (iteratingKey as Comparable).equals(key as unknown as Comparable);
                });

                key = matchingKey ?? key;
            }

            const value = result.get(key) ?? [];

            value.push(sourceData);

            result.set(key, value);
        }

        return result;
    }

    /**
     * Gets the last element in the array.
     *
     * @param source
     * @param defaultValue
     * @returns
     */
    public static last<T = any>(source: Array<T>, defaultValue: any = null): T {
        if (!Arr.empty(source)) {
            return source[source.length - 1];
        }
        return defaultValue;
    }

    /**
     * Returns the unique values in the source array in a new array
     *
     * @param source
     * @returns
     */
    public static unique<T = any>(source: Array<T>) {
        return Array.from(new Set(source));
    }
}
