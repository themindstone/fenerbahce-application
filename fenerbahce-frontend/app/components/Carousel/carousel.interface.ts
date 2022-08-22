export interface OwlCarouselChangeEventInterface {
	currentPage: number;
	pageCount: number;
}

export interface OwlCarouselGoToEventInterface {
	page: number;
}

export interface CarouselPropsInterface {
	children?: React.ReactNode;
	options: any;
}
