export interface SlideshowChangeEventInterface {
	currentPage: number;
	pageCount: number;
}

export interface SlideshowlGoToEventInterface {
	page: number;
}

export interface SlideshowPropsInterface {
	children?: React.ReactNode;
	options: any;
	images: { original: string; thumbnail: string }[];
}
