import { EventMap } from "./eventbus.type";

export interface EventBus<T extends EventMap> {
	subscribe<Key extends keyof T>(key: Key, handler: T[Key]): { unsubscribe: () => void };
	unsubscribe<Key extends keyof T>(key: Key, handler: T[Key]): void;
	once<Key extends keyof T>(key: Key, handler: T[Key]): void;
	publish<Key extends keyof T>(key: Key, ...payload: Parameters<T[Key]>): void;
}

export interface EventBusConfig {
	onError: (...params: any[]) => void;
}
