import { eventbus } from "~/libs/event-bus";

export const buyNowModalEventBus = eventbus<{
	"buynowmodal.open": (auction: any) => void;
}>();
