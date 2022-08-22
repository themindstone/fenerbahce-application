import { useEffect } from "react";
import type { EventBus, EventBusConfig } from "./eventbus.interface";
import { EventMap, Bus } from "./eventbus.type";

export function eventbus<E extends EventMap>(config?: EventBusConfig): EventBus<E> {
	const bus: Partial<Bus<E>> = {};

	const subscribe: EventBus<E>['subscribe'] = (key, handler) => {
		if (bus[key] === undefined) {
			bus[key] = [];
		}
		bus[key]?.push(handler);

		return {
            unsubscribe: () => unsubscribe(key, handler)
        };
	};

	const unsubscribe: EventBus<E>['unsubscribe'] = (key, handler) => {
		const index = bus[key]?.indexOf(handler) ?? -1;
		bus[key]?.splice(index >>> 0, 1);
	};

	const once: EventBus<E>['once'] = (key, handler) => {
		const handleOnce = (payload: Parameters<typeof handler>) => {
			handler(payload);
			// TODO: find out a better way to type `handleOnce`
			unsubscribe(key, handleOnce as typeof handler);
		};

		subscribe(key, handleOnce as typeof handler);
	};

	const publish: EventBus<E>['publish'] = (key, payload) => {
		bus[key]?.forEach(fn => {
			try {
				fn(payload);
			} catch (e) {
				config?.onError(e);
			}
		});
	};

	const useListener: EventBus<E>['useListener'] = (key, handler) => {
		useEffect(() => {
			subscribe(key, handler);

			return () => {
				unsubscribe(key, handler);
			}
		}, []);
	};

	return { subscribe, unsubscribe, once, publish, useListener };
}
