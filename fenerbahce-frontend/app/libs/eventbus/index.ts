import { EventBus, EventBusConfig } from "./eventbus.interface";
import { EventMap, EventHandler, Bus, EventKey } from "./eventbus.type";
import { eventbus } from "./eventbus";

export type {
    EventBus, EventBusConfig,
    EventMap, EventHandler, Bus, EventKey,
};

export {
    eventbus,
};
