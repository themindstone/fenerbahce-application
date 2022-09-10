import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ReactElement, useCallback } from "react";
import { GoldenFizzButton, WhiteButton } from "~/components";
import { useCountdownTimer } from "~/hooks";
import { useLoaderData } from "@remix-run/react";
import { OfferCard } from "./OfferCard";
import { CollapsibleCard } from "./CollapsibleCard";
import { TimeLeftBox } from "./TimeLeftBox";
import { humanReadableNumber } from "~/utils";
import { useAuctionContract } from "~/contracts";

export const ProductInfo = (): ReactElement => {
	const { auction } = useLoaderData();
	
	const { days, hours, minutes } = useCountdownTimer(auction.endDate);

	const auctionContract = useAuctionContract();

	const deposit = useCallback(() => {
		let maxOffer = auction.auctionStartPrice;
		if (Array.isArray(auction.balances) && auction.balances.length > 0) {
			const balancesArray = auction.balances.map((balance: any) => balance.balance);
			maxOffer = Math.max(balancesArray);
		}
		const value = maxOffer + auction.bidIncrement;
		auctionContract.deposit({
			auctionId: auction.id,
			value
		});
	}, [auctionContract]);

	return (
		<Box>
			<Flex direction="column" maxW="400px" gap="30px">
				<Heading>{auction.name}</Heading>
				<Flex direction="column" gap="10px">
					<Text>Kalan süre</Text>
					<Flex gap="20px">
						<TimeLeftBox left={days} text="GÜN"></TimeLeftBox>
						<TimeLeftBox left={hours} text="SAAT"></TimeLeftBox>
						<TimeLeftBox left={minutes} text="DAKİKA"></TimeLeftBox>
					</Flex>
				</Flex>
				<Flex gap="10px" direction="column" alignItems="stretch">
					<WhiteButton>HEMEN AL {humanReadableNumber(auction.auctionImmediatePrice)}₺</WhiteButton>
					<GoldenFizzButton onClick={deposit}>TEKLİF VER</GoldenFizzButton>
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
