import { ReactElement } from "react";
// const { Swiper, SwiperSlide } = require('swiper/react');
import React from "react";
// import OwlCarousel from "react-owl-carousel2";

const OwlCarousel = React.lazy(() => import("react-owl-carousel2"));
import { ClientOnly } from "remix-utils";



interface CarouselPropsInterface {
    children?: React.ReactNode;
    options: Object;
}

const Fallback = (): ReactElement => {
    return <div>loading</div>
}

const Carousel = ({
    children,
    options
}: CarouselPropsInterface): React.ReactNode => {

    return (<React.Suspense fallback={<Fallback />}>
        <ClientOnly fallback={<Fallback />}>
            {() => <OwlCarousel options={options}>
                {children}
            </OwlCarousel>}
        </ClientOnly>
    </React.Suspense>);
    
};

export default Carousel;