import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { ReactElement } from "react";
import { GoldenFizzButton, WhiteButton } from "~/components";
import { useCountdownTimer } from "~/hooks";
import { useLoaderData } from "@remix-run/react";
import { OfferCard } from "./OfferCard";
import { CollapsibleCard } from "./CollapsibleCard";
import { TimeLeftBox } from "./TimeLeftBox";

export const ProductInfo = (): ReactElement => {
	const { product } = useLoaderData();

	const { days, hours, minutes } = useCountdownTimer(product.endDate);

	return (
		<Box>
			<Flex direction="column" maxW="400px" gap="30px">
				<Heading>{product.name}</Heading>
				<Flex direction="column" gap="10px">
					<Text>Kalan süre</Text>
					<Flex gap="20px">
						<TimeLeftBox left={days} text="GÜN"></TimeLeftBox>
						<TimeLeftBox left={hours} text="SAAT"></TimeLeftBox>
						<TimeLeftBox left={minutes} text="DAKİKA"></TimeLeftBox>
					</Flex>
				</Flex>
				<Flex gap="10px" direction="column" alignItems="stretch">
					<WhiteButton>HEMEN AL {product.auctionImmediatePrice}₺</WhiteButton>
					<GoldenFizzButton>TEKLİF VER</GoldenFizzButton>
				</Flex>
				<Flex direction="column" gap="10px">
					<Text>En Yüksek Teklif</Text>
					<OfferCard withToken={true} />
				</Flex>

                <Flex direction="column" gap="10px">
					<Text>Diğer Teklifler</Text>
					<OfferCard withToken={false} />
					<OfferCard withToken={false} />
					<OfferCard withToken={false} />
				</Flex>
                <Flex gap="15px" direction="column">
                    <CollapsibleCard title="Deneyimin detayları" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo officiis totam repellat odit eum accusamus blanditiis rem quod fugit, minus sapiente magni corporis qui beatae amet eligendi dolore cupiditate porro." />
                    <CollapsibleCard title="Deneyimin özellikleri" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo officiis totam repellat odit eum accusamus blanditiis rem quod fugit, minus sapiente magni corporis qui beatae amet eligendi dolore cupiditate porro." />
                    <CollapsibleCard title="Şartlar" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo officiis totam repellat odit eum accusamus blanditiis rem quod fugit, minus sapiente magni corporis qui beatae amet eligendi dolore cupiditate porro." />
                </Flex>
			</Flex>
		</Box>
	);
};
