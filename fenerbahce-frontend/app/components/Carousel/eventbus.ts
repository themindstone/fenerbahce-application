import { eventbus } from "~/libs/event-bus";
import { OwlCarouselChangeEventInterface, OwlCarouselGoToEventInterface } from "./carousel.interface";

export const owlcarouselEventBus = eventbus<{
	"owlcarousel.changed": (event: OwlCarouselChangeEventInterface) => void;
	"owlcarousel.goto": (event: OwlCarouselGoToEventInterface) => void;
}>();
