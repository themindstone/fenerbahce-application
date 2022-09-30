import { eventbus } from "~/libs/event-bus";

export const placeBidModalEventBus = eventbus<{
	"placebidmodal.open": (params: any) => void;
}>();
