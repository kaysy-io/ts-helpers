export type ListenerFunction<T = any> = (event: string, data?: T) => Promise<void>;
