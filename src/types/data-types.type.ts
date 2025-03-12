export interface KeyValue<T> {
    [key: string]: T;
}

export interface KeyValueString extends KeyValue<string> {}

export interface NullableKeyValueString extends KeyValue<string | null | undefined> {}

export interface AnyObject extends KeyValue<any> {}
