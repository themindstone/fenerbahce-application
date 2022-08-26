import { eventbus } from "~/libs/event-bus";


export const sideNavEventBus = eventbus<{
    "sidenav.open": () => void,
    "sidenav.close": () => void,
    "sidenav.toggle": () => void,
}>();
