import { ReactElement, useEffect } from "react";
import OwlCarousel from "react-owl-carousel2";



interface CarouselPropsInterface {
    children?: React.ReactNode;
    options: Object;
}

const Carousel = ({
    children,
    options
}: CarouselPropsInterface): ReactElement => {

    return <OwlCarousel options={options}>
        {children}
    </OwlCarousel>


};

export default Carousel;