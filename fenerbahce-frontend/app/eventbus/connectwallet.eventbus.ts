import { eventbus } from "~/libs/event-bus";

export const connectWalletEventBus = eventbus<{
    "connectwallet.open": () => void;
    "connectwallet.close": () => void;
}>();
