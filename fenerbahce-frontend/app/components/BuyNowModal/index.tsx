import {
	Box,
	Flex,
	Heading,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { buyNowModalEventBus } from "~/eventbus";
import { useChainConfig } from "~/hooks";
import { useAuctionContractAdapter } from "~/mediators";
import { humanReadableNumber } from "~/utils";
import { WhiteButton } from "../Button";

export const BuyNowModal = (): ReactElement => {
	const [auction, setAuction] = useState<any>({});

	const { isOpen, onOpen, onClose } = useDisclosure();

	const { deposit } = useAuctionContractAdapter(auction, [auction]);
	const { switchToNetwork } = useChainConfig();

	buyNowModalEventBus.useListener(
		"buynowmodal.open",
		async (auction: any) => {
			await switchToNetwork();
			setAuction(auction);
			onOpen();
		},
		[],
	);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay>
				<ModalContent color="whiteAlpha.800" p="20px" bg="var(--biscay)">
					<ModalCloseButton />
					<Flex direction="column" gap="20px">
						<Heading size="lg">Hemen Al</Heading>
						<Flex gap="12px">
							<Box
								borderRadius="5px"
								flexBasis="125px"
								height="125px"
								flexShrink={0}
								bgImage={`url(${auction?.photoUrls && auction.photoUrls[0].photoUrl})`}
								bgSize="contain"></Box>
							<Flex justifyContent="center" direction="column" gap="12px">
								<Text>Hemen Alınan Açık Artırma</Text>
								<Heading fontSize="20px">{auction.name}</Heading>
							</Flex>
						</Flex>
						<Flex direction="column" gap="12px">
							<Heading size="sm">Hemen Al Fiyatı</Heading>
							<Box
								bg="var(--indigo)"
								border="1px solid #fff"
								textAlign="center"
								borderRadius="5px"
								h="40px"
								lineHeight="40px">
								{humanReadableNumber(auction.buyNowPrice).toFixed(2)} FB
							</Box>
						</Flex>
						<WhiteButton onClick={() => deposit({ offer: auction.buyNowPrice || 0 })}>HEMEN AL</WhiteButton>
					</Flex>
				</ModalContent>
			</ModalOverlay>
		</Modal>
	);
};
