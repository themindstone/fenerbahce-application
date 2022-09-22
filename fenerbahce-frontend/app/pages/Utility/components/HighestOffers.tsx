import { Box, Flex, Heading, Text, VStack, Link } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { Carousel } from "~/components";
import { useLoaderData } from "@remix-run/react";

interface HighestOffersCardProps {
	slug: string;
	offers: number[];
	photoUrls: string[];
}

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
	margin: 30,
};

const HighestOffersCard = ({ slug, offers, photoUrls }: HighestOffersCardProps): ReactElement => {
	return (
		<Link href={`/product/${slug}`}>
			<Flex borderRadius="15px" overflow="hidden" bg="var(--governor-bay)" direction="column">
				<Box
					style={{ aspectRatio: "13/16" }}
					bgImage={`url(${photoUrls[0]})`}
					w="100%"
					bgRepeat="no-repeat"
					bgPos="center"
				/>
				<Flex direction="column" p="15px 20px" gap="10px" fontWeight="bold">
					<Flex justifyContent="space-between" color="var(--golden-fizz)">
						<Text>En yüksek teklif</Text>
						<Text>25.000TL</Text>
					</Flex>
					<Flex justifyContent="space-between">
						<Text>En yüksek 2. teklif</Text>
						<Text>25.000TL</Text>
					</Flex>
				</Flex>
			</Flex>
		</Link>
	);
};

export const HighestOffers = (): ReactElement => {
	const { highestOfferAuctions } = useLoaderData();

	return (
		<VStack gap="20px" maxW="1000px" margin="50px auto" padding="0 30px">
			<Heading size="xl">En Yüksek Teklif Gelen Açık Artırmalar</Heading>
			<Carousel options={options}>
				{highestOfferAuctions.map((item: any) => {
					return <HighestOffersCard slug={item.slug} offers={item.offers} photoUrls={item.photoUrls} />;
				})}
			</Carousel>
		</VStack>
	);
};
