import { eventbus } from "~/libs/event-bus";


export const adminResultEventBus = eventbus<{
    "adminresult.open": (params: { isSucceed: boolean, description: string }) => void;
}>();

