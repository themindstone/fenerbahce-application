import type { ReactElement } from "react";
import React from "react";
import { ClientOnly } from "remix-utils";
import type { CarouselPropsInterface } from "./carousel.interface";
import { OwlCarousel } from "./OwlCarousel";

const Fallback = (): ReactElement => {
    return <div>loading</div>
}

export const Carousel = (props: CarouselPropsInterface): ReactElement => {

    return (<React.Suspense fallback={<Fallback />}>
        <ClientOnly fallback={<Fallback />}>
            {() => (<OwlCarousel {...props} />)}
        </ClientOnly>
    </React.Suspense>);
};
