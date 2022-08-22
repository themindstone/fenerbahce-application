import type { ReactElement } from "react";
import React, { useRef, useState, Fragment, useMemo } from "react";
import { owlcarouselEventBus } from "./eventbus";
import { CarouselPropsInterface } from "./carousel.interface";
import { Button, Flex } from "@chakra-ui/react";

const OwlCarousel = React.lazy(() => import("react-owl-carousel2"));

const CarouselNav = ({
    num
}: { num: number }): ReactElement => {

    const [number, setNumber] = useState(() => num);

    owlcarouselEventBus.useListener("owlcarousel.changed", (event) => {
        setNumber(event.index);
    });

    const numArr = useMemo<number[]>(() => {
        const arr: number[] = [];
        
        for (let i = 0; i < num; i++) {
            arr.push(i);
        }

        return arr;
    }, [num]);

    const goTo = (page: number) => {
        owlcarouselEventBus.publish("owlcarousel.goto", { page });
    };

    return <Flex gap="10px">
        {numArr.map((item, index) => {
            return <div key={index} onClick={() => goTo(item)}>{item}</div>
        })}
    </Flex>
};


const OwlCarousel2 = ({
    children,
    options
}: CarouselPropsInterface): ReactElement => {
    const ref = useRef();

    owlcarouselEventBus.useListener("owlcarousel.goto", (event) => {
        (ref as any).current.goTo(event.page);
    });

    const prev = () => (ref as any).current.prev();
    const next = () => (ref as any).current.next();

    const events = {
        onChanged: (event: any) => {
            owlcarouselEventBus.publish("owlcarousel.changed", { index: event.page.index as number });
        }
    };

    return (<Fragment>
        <OwlCarousel ref={ref} options={options} events={events}>
            {children}
        </OwlCarousel>
        <Flex gap="10px">
            <Button onClick={prev}>prev</Button>
            <CarouselNav num={(children as Array<Object>).length} />
            <Button onClick={next}>next</Button>
        </Flex>
    </Fragment>
    );
};

export {
    OwlCarousel2 as OwlCarousel,
};
