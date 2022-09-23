import { eventbus } from "~/libs/event-bus";

export const loadingModalEventBus = eventbus<{
    "loadingmodal.open": (params: { message: string }) => void;
    "loadingmodal.close": () => void;
}>();