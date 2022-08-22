import { Fragment, ReactElement, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { ClientOnly } from "remix-utils";
import { Box, Button, Flex } from "@chakra-ui/react";

const OwlCarousel = React.lazy(() => import("react-owl-carousel2"));

interface CarouselPropsInterface {
    children?: React.ReactNode;
    options: any;
}

const Fallback = (): ReactElement => {
    return <div>loading</div>
}

const OwlCarouselDots = ({
    num
}: { num: number }): ReactElement => {

    const [number, setNumber] = useState(() => num);

    useEffect(() => {
        const handler = (newPageNumber: number) => {
            setNumber(newPageNumber);
        }
        // document.addEventListener("owlcarouselchanged", handler);

        return () => {
            // document.removeEventListener("owlcarouselchanged", handler);
        }
    })

    const numArr = useMemo<number[]>(() => {
        const arr: number[] = [];
        
        for (let i = 0; i < num; i++) {
            arr.push(i);
        }

        return arr;
    }, [num]);

    return <Flex>
        {numArr.map((item, index) => {
            return <div>{item}</div>
        })}
    </Flex>
};

export const Carousel = ({
    children,
    options
}: CarouselPropsInterface): ReactElement => {

    const ref = useRef();
    const _ref = ref as any;

    const prev = () => {
        _ref.current.prev();
    };

    const next = () => {
        _ref.current.next();
    };

    const events = {
        onChanged: (event: any) => {
        }
    };


    return (<React.Suspense fallback={<Fallback />}>
        <ClientOnly fallback={<Fallback />}>
            {() => (<Fragment>
                <OwlCarousel ref={ref} options={options} events={events}>
                    {children}
                </OwlCarousel>
                <Flex>
                    <Button onClick={prev}>prev</Button>
                    <OwlCarouselDots num={(children as Array<Object>).length} />
                    <Button onClick={next}>next</Button>
                </Flex>
            </Fragment>)}
        </ClientOnly>
    </React.Suspense>);
    
};

