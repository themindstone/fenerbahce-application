import { eventbus } from "~/libs/event-bus";

export const connectWalletEventBus = eventbus<{
    "connectwallet.open": () => void;
    "connectwallet.close": () => void;
    "connectwallet.toggleaccountmodal": () => void;
    "connectwallet.accountmodalchange": (status: boolean) => void;
    "connectwallet.connectwalletmodalchange": (status: boolean) => void;
}>();
