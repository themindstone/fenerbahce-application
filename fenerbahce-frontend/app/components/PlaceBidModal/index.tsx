import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	Flex,
	Heading,
	Box,
	Input,
	useDisclosure,
	Text,
	IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuctionContractAdapter } from "~/mediators";
import { GoldenFizzButton } from "~/components";
import { modal1907EventBus, placeBidModalEventBus } from "~/eventbus";
import { humanReadableNumber } from "~/utils";
import { MinusIcon, PlusIcon } from "~/assets";
import { useChainConfig } from "~/hooks";

export function PlaceBidModal() {
	const { isOpen, onClose, onOpen } = useDisclosure();

	const [auction, setAuction] = useState<any>({});
	const [value, setValue] = useState<number | null>(null);
	const [minValue, setMinValue] = useState(0);

	const { deposit } = useAuctionContractAdapter(auction, [auction]);
	const { switchToNetwork } = useChainConfig()

	placeBidModalEventBus.useListener(
		"placebidmodal.open",
		async newAuction => {
			await switchToNetwork();
			const newValue =
				newAuction.balances.length > 0
					? newAuction.bidIncrement + newAuction.balances[0]
					: newAuction.startPrice;
			onOpen();
			setAuction(newAuction);
			setValue(newValue);
			setMinValue(newValue);
		},
		[auction],
	);

	const propose = () => {
		if (!value) {
			return;
		}
		if (value < minValue) {
			modal1907EventBus.publish("modal.open", {
				isSucceed: false,
				description: "Minimum teklif miktarından daha fazla teklif vermeniz gerekiyor.",
			});
			return;
		}
		deposit({ offer: value });
	};

	const increment = () => {
		if (!Number(auction.bidIncrement)) {
			return;
		}

		setValue(prev => {
			const val = (prev || 0) + auction.bidIncrement;
			if (val > auction.buyNowPrice) {
				return prev;
			}
			return val;
		});
	};

	const decrement = () => {
		if (!Number(auction.bidIncrement)) {
			return;
		}

		setValue(prev => {
			const val = (prev || 0) - auction.bidIncrement;
			if (val < minValue) {
				return prev;
			}
			return val;
		});
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay>
				<ModalContent color="whiteAlpha.800" p="20px" bg="var(--biscay)">
					<ModalCloseButton />
					<Flex direction="column" gap="20px">
						<Heading size="lg">Teklif Ver</Heading>
						<Flex gap="12px">
							<Box
								borderRadius="5px"
								flexBasis="125px"
								height="125px"
								flexShrink={0}
								bgImage={`url(${auction?.photoUrls && auction.photoUrls[0].photoUrl})`}
								bgSize="contain"></Box>
							<Flex justifyContent="center" direction="column" gap="12px">
								<Text>Teklif Verilen Açık Artırma</Text>
								<Heading fontSize="20px">{auction.name}</Heading>
							</Flex>
						</Flex>
						<Flex direction="column" gap="10px">
							<Heading size="sm">Teklifiniz</Heading>
							<Flex alignItems="center" gap="12px">
								<IconButton
									aria-label="minus"
									border="1px solid #fff"
									as={MinusIcon}
									bg="var(--indigo)"
									p="10px"
									cursor="pointer"
									onClick={decrement}
									_hover={{ filter: "brightness(0.9)" }}
									_active={{ filter: "brightness(0.8)" }}></IconButton>
								<Flex
									flexGrow="1"
									justifyContent="center"
									alignItems="center"
									border="1px solid #fff"
									borderRadius="5px"
									bg="var(--indigo)">
									<Input
										type="number"
										value={value !== null ? Intl.NumberFormat("en-US").format(value) : ""}
										textAlign="center"
										w="45px"
										p="0"
										border="none"
										max={auction.buyNowPrice}
										_focusVisible={{ border: "none" }}
										onChange={e => {
											if (Number(e.target.value) > auction?.buyNowPrice) {
												e.preventDefault();
												return;
											}
											if (e.target.value === "") {
												setValue(null);
												return;
											}
											const num = Number(
												Intl.NumberFormat("en-US").format(Number(e.target.value)),
											);
											if (num || num === 0) {
												setValue(num);
											}
										}}
									/>
									<Text>FB</Text>
								</Flex>
								<IconButton
									aria-label="plus"
									as={PlusIcon}
									bg="var(--indigo)"
									p="10px"
									border="1px solid #fff"
									cursor="pointer"
									_hover={{ filter: "brightness(0.9)" }}
									_active={{ filter: "brightness(0.8)" }} onClick={increment}></IconButton>
							</Flex>
						</Flex>
						<Text color="whiteAlpha.800" fontSize="sm">
							Minimum {humanReadableNumber(minValue).toFixed(2)} FB Token teklifi verebilirsiniz.
						</Text>
						<GoldenFizzButton onClick={propose}>TEKLİF VER</GoldenFizzButton>
					</Flex>
				</ModalContent>
			</ModalOverlay>
		</Modal>
	);
}
