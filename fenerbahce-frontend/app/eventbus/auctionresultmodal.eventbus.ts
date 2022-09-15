import { eventbus } from "~/libs/event-bus";

export const auctionResultModalEventBus = eventbus<{
    "auctionresultmodal.open": (params: { isSucceed: boolean, description: string }) => void;
}>();
