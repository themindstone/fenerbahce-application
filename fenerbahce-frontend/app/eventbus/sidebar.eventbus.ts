import { eventbus } from "~/libs/event-bus";

export const sidebarEventBus = eventbus<{
    "sidebar.open": () => void;
    "sidebar.close": () => void;
}>();