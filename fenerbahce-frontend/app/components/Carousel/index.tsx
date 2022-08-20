import { ReactElement } from "react";
import React from "react";
import { ClientOnly } from "remix-utils";

const OwlCarousel = React.lazy(() => import("react-owl-carousel2"));

interface CarouselPropsInterface {
    children?: React.ReactNode;
    options: Object;
}

const Fallback = (): ReactElement => {
    return <div>loading</div>
}

export const Carousel = ({
    children,
    options
}: CarouselPropsInterface): ReactElement => {

    return (<React.Suspense fallback={<Fallback />}>
        <ClientOnly fallback={<Fallback />}>
            {() => <OwlCarousel options={options}>
                {children}
            </OwlCarousel>}
        </ClientOnly>
    </React.Suspense>);
    
};

