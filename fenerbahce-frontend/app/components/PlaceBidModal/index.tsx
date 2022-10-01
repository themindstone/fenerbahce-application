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
import { modal1907EventBus, placeBidModalEventBus } from "~/eventbus";
import { humanReadableNumber } from "~/utils";

export function PlaceBidModal() {
	const { isOpen, onClose, onOpen } = useDisclosure();

	const [auction, setAuction] = useState({});
	const [value, setValue] = useState(1.5);
	const [minValue, setMinValue] = useState(0);

	const { deposit } = useAuctionContractAdapter(auction, [auction]);

	placeBidModalEventBus.useListener(
		"placebidmodal.open",
		newAuction => {
			console.log(newAuction)
			const newValue =
				newAuction.balances.length > 0
					? newAuction.bidIncrement + newAuction.balances[0]
					: newAuction.startPrice;
			onOpen();
			setAuction(newAuction);
			setMinValue(newValue);
		},
		[auction],
	);


	const propose = () => {
		if (value < minValue) {
			modal1907EventBus.publish("modal.open", {
				isSucceed: false,
				description: "Minimum teklif miktarından daha fazla teklif vermeniz gerekiyor."
			});
			return;
		}
		deposit({ offer: value })	
	}

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
							value={value}
							onChange={e => {
								setValue(Number(e.target.value));
							}}
						/>
						<Text color="blackAlpha.600" fontSize="sm">
							Must be at least {humanReadableNumber(minValue).toFixed(2)} FB Token
						</Text>
						<GoldenFizzButton onClick={propose}>Teklif Ver</GoldenFizzButton>
					</Flex>
				</ModalContent>
			</ModalOverlay>
		</Modal>
	);
}
