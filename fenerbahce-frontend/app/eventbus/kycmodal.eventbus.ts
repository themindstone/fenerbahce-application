import { eventbus } from "~/libs/event-bus";

export const KYCModalEventBus = eventbus<{
	"kycmodal.open": () => void;
}>();
