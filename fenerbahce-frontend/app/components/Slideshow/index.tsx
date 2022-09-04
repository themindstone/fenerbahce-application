import { ReactElement } from "react";
import React from "react";
import { SlideshowPropsInterface, SlideshowChangeEventInterface, SlideshowlGoToEventInterface } from "./slideshow.interface";
import { eventbus } from "~/libs/event-bus";
import { ClientOnly } from "remix-utils";
import ImageGallery from "react-image-gallery";
import { UniformImage, UniformImage1, UniformImage2, UniformImage3 } from "~/assets";

const Fallback = (): ReactElement => {
	return <div>loading</div>;
};

const images = [
	{
	  original: UniformImage,
	  thumbnail: UniformImage,
	},
	{
	  original: UniformImage1,
	  thumbnail: UniformImage1,
	},
	{
	  original: UniformImage2,
	  thumbnail: UniformImage2,
	},
	{
	  original: UniformImage3,
	  thumbnail: UniformImage3,
	},
  ];

const Slideshow = (props: SlideshowPropsInterface) => {

	return <ImageGallery items={images}
			showNav={false}
			showPlayButton={false}
			showFullscreenButton={false}
			slideDuration={300}
			isRTL={true} />
};

export { Slideshow };
