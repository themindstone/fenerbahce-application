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
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuctionContractAdapter } from "~/mediators";
import { GoldenFizzButton } from "~/components";
import { placeBidModalEventBus } from "~/eventbus";

export function PlaceBidModal() {
	const { isOpen, onClose, onOpen } = useDisclosure();

	const [auction, setAuction] = useState({});
	const [value, setValue] = useState(0);

	const { deposit } = useAuctionContractAdapter(auction, [auction]);

	placeBidModalEventBus.useListener(
		"placebidmodal.open",
		newAuction => {
			const newValue =
				newAuction.balances.length > 0
					? newAuction.bidIncrement + newAuction.balances[0].balance
					: newAuction.startPrice;
			setAuction(newAuction);
			setValue(newValue);
			onOpen();
		},
		[auction],
	);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay>
				<ModalContent color="blackAlpha.800" p="20px">
					<ModalCloseButton></ModalCloseButton>
					<Flex direction="column" gap="12px">
						<Heading size="md">Place a Bid</Heading>
						<Box>
							<Text>You are about to place a bit for: </Text>
							<Text>Item Name by Item Owner: </Text>
						</Box>
						<Heading size="sm">Your Bid (FB Token)</Heading>
						<Input
							placeholder="Your bid"
							type="number"
							onChange={e => {
								setValue(Number(e.target.value));
							}}
						/>
						<Text color="blackAlpha.600" fontSize="sm">
							Must be at least 1.5 FB Token
						</Text>
						<GoldenFizzButton onClick={() => deposit({ offer: value })}>Teklif Ver</GoldenFizzButton>
					</Flex>
				</ModalContent>
			</ModalOverlay>
		</Modal>
	);
}
