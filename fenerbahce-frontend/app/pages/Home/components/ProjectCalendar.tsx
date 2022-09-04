import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Carousel } from "~/components";

interface TimelineItemProps {
	title: string;
	date: string;
	isFirstItem: boolean;
	isLastItem: boolean;
}

const items = Array(6).fill({
	title: "May 1940",
	date: "9 Agustos 2021",
	url: "http://www.history.com",
});

const options = {
	items: 4,
	autoWidth: true,
};

const TimelineItem = ({ title, date, isFirstItem, isLastItem }: TimelineItemProps): ReactElement => {
	const styles: any = {};

	if (!isFirstItem) {
		styles["_after"] = {
			content: "''",
			pos: "absolute",
			top: "85px",
			left: 0,
			height: "3px",
			background: "var(--golden-fizz)",
			width: "50%",
		};
	}

	if (!isLastItem) {
		styles["_before"] = {
			content: "''",
			pos: "absolute",
			top: "85px",
			right: 0,
			height: "3px",
			background: "var(--golden-fizz)",
			width: "50%",
		};
	}

	return (
		<VStack pos="relative" w="300px" gap="20px" padding="60px 0">
			<Box
				background="var(--golden-fizz)"
				{...styles}
				height="50px"
				backgroud="green"
				width="50px"
				borderRadius="25px"></Box>
			<VStack gap="10px">
				<Text>{date}</Text>
				<Heading size="sm">{title}</Heading>
			</VStack>
		</VStack>
	);
};

const Timeline = (): ReactElement => {
	return (
		<Carousel options={options}>
			{items.map((item, index) => {
				return (
					<TimelineItem
						title={item.title}
						date={item.date}
						isFirstItem={index === 0}
						isLastItem={index === items.length - 1}
					/>
				);
			})}
		</Carousel>
	);
};

export const ProjectCalendar = (): ReactElement => {
	return (
		<VStack w="95%" m="-80px auto">
			<Heading size="xl" transform="translateY(30px)">
				Proje Takvimi
			</Heading>
			<Box transform="translateY(80px)" background="white" borderRadius="10px" w="100%" color="black">
				<Timeline />
			</Box>
		</VStack>
	);
};
