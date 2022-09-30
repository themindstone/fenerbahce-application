import { ReactElement } from "react";
import React, { useRef, useState, Fragment, useMemo, useLayoutEffect } from "react";
import { CarouselPropsInterface, OwlCarouselChangeEventInterface, OwlCarouselGoToEventInterface } from "./carousel.interface";
import { Box, Flex } from "@chakra-ui/react";
import { eventbus } from "~/libs/event-bus";
import { ClientOnly } from "remix-utils";
import { ArrowBackIcon, ArrowForwardIcon } from "~/assets";

const OwlCarousel = React.lazy(() => import("react-owl-carousel2"));

const Fallback = (): ReactElement => {
	return <div>loading</div>;
};

const Carousel = (props: CarouselPropsInterface) => {
	const owlcarouselEventBus = eventbus<{
		"owlcarousel.changed": (event: OwlCarouselChangeEventInterface) => void;
		"owlcarousel.goto": (event: OwlCarouselGoToEventInterface) => void;
	}>();

	const CarouselNav = (): ReactElement => {
		const [pageCount, setPageCount] = useState<number>(0);
		const [currentPage, setCurrentPage] = useState<number>(1);

		owlcarouselEventBus.useListener("owlcarousel.changed", event => {
			setCurrentPage(event.currentPage);
			setPageCount(event.pageCount);
		}, []);

		const numArr = useMemo<number[]>(() => Array.from(Array(pageCount).keys()), [pageCount]);

		const goTo = (page: number) => {
			owlcarouselEventBus.publish("owlcarousel.goto", { page });
		};

		return (
			<Flex gap={{ base: "5px", md: "10px" }} alignItems="center">
				{numArr.map((item, index) => {
					return (
						<Box 
							bgColor={currentPage === index ? "#D8D8D8" : "#051A4E"}
							borderRadius="10px"
							h="10px"
							w="10px"
							onClick={() => goTo(index)}
							key={index}
						></Box>
					);
				})}
			</Flex>
		);
	};

	const OwlCarousel2 = ({ children, options }: CarouselPropsInterface): ReactElement => {

		const [show, setShow] = useState<boolean>(false);
		
		const ref = useRef() as any;

		owlcarouselEventBus.useListener("owlcarousel.goto", event => {
			ref.current.goTo(event.page);
		}, []);

		const prev = () => ref.current.prev();
		const next = () => ref.current.next();

		const events = {
			onChanged: (event: any) => owlcarouselEventBus.publish("owlcarousel.changed", {
					currentPage: Math.floor(event.item.index / event.page.size) as number,
					pageCount: Math.floor(event.item.count / event.page.size) as number
				}),
		};

		useLayoutEffect(() => {
			setShow(true);
		}, []);

		return (
			<Fragment>
				{show &&
					<OwlCarousel ref={ref} options={options} events={events}>
						{children}
					</OwlCarousel>
				}
				<Flex paddingTop="10px" gap="10px" alignItems="center" userSelect="none">
					<ArrowBackIcon onClick={prev} cursor="pointer" height="24px" width="24px" fill="white" />
					<CarouselNav />
					<ArrowForwardIcon fill="white" onClick={next} cursor="pointer" />
				</Flex>
			</Fragment>
		);
	};

	return (
		<React.Suspense fallback={<Fallback />}>
			<ClientOnly fallback={<Fallback />}>{() => <OwlCarousel2 {...props} />}</ClientOnly>
		</React.Suspense>
	);
};

export { Carousel };
