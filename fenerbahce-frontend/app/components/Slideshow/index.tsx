import { ReactElement } from "react";
import { SlideshowPropsInterface } from "./slideshow.interface";
import ImageGallery from "react-image-gallery";

const Slideshow = ({ images }: SlideshowPropsInterface): ReactElement => {
	return (
		<ImageGallery
			items={images}
			showNav={false}
			showPlayButton={false}
			showFullscreenButton={false}
			slideDuration={300}
			isRTL={true}
		/>
	);
};

export { Slideshow };
