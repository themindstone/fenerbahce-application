import { eventbus } from "~/libs/event-bus";

export const modal1907EventBus = eventbus<{
    "modal.open": (params: { isSucceed: boolean, description: string }) => void;
    "modal.close": () => void;
}>();
