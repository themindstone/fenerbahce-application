export type EventKey = string | symbol;
export type EventHandler<T = any> = (payload: T) => void;
export type EventMap = Record<EventKey, EventHandler>;
export type Bus<E> = Record<keyof E, E[keyof E][]>;
