import { Box, Flex, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { ReactElement, useMemo } from "react";
import { Carousel } from "~/components";
import { useLoaderData } from "@remix-run/react";

const options = {
	loop: false,
	responsive: {
		800: {
			items: 3,
			slideBy: 3,
		},
		550: {
			items: 2,
			slideBy: 2,
		},
		0: {
			items: 1,
			slideBy: 1,
		},
	},
	margin: 30
};

interface ActiveAuctionsCardProps {
	photoUrls: string[];
	slug: string;
	offers: number[];
}

const ActiveAuctionsCard = ({
	photoUrls,
	offers,
	slug
}: ActiveAuctionsCardProps): ReactElement => {

	const highestOffer = useMemo(() => offers[offers.length - 1], [offers]);

	console.log(slug)

	return (<Link href={`/product/${slug}`}>
		<Flex borderRadius="15px" overflow="hidden" bg="var(--governor-bay)" direction="column">
			<Box style={{ aspectRatio: "13/16" }}
				bgImage={`url(${photoUrls[0]})`}
				w="100%"
				bgRepeat="no-repeat"
				bgPos="center" />
			<Flex direction="column" p="15px 20px" gap="10px" fontWeight="bold">
				<Flex justifyContent="space-between" color="var(--golden-fizz)">
					<Text>En yüksek teklif</Text>
					<Text>25.000{highestOffer}TL</Text>
				</Flex>
				<Flex justifyContent="space-between">
					<Text>En yüksek teklif</Text>
					<Text>25.000TL</Text>
				</Flex>
			</Flex>
		</Flex>
	</Link>);
};

export const ActiveAuctions = (): ReactElement => {

	const { activeAuctions } = useLoaderData();

	return (
		<VStack gap="20px" maxW="1000px" margin="50px auto" padding="0 30px">
			<Heading size="xl">Aktif acik artirmalar</Heading>
			<Carousel options={options}>
				{activeAuctions.map(((item: any) => {
					console.log(item)
					return <ActiveAuctionsCard
								key={item.id}
								photoUrls={item.photoUrls}
								offers={item.offers}
								slug={item.slug} />
				}))}
			</Carousel>
		</VStack>
	);
};
