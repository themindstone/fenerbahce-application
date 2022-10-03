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

	const [auction, setAuction] = useState<any>({});
	const [value, setValue] = useState<number>(0);
	const [minValue, setMinValue] = useState(0);

	const { deposit } = useAuctionContractAdapter(auction, [auction]);

	placeBidModalEventBus.useListener(
		"placebidmodal.open",
		newAuction => {
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
		if (value < minValue) {
			modal1907EventBus.publish("modal.open", {
				isSucceed: false,
				description: "Minimum teklif miktarından daha fazla teklif vermeniz gerekiyor.",
			});
			return;
		}
		deposit({ offer: value });
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay>
				<ModalContent color="blackAlpha.800" p="20px">
					<ModalCloseButton></ModalCloseButton>
					<Flex direction="column" gap="12px">
						<Heading size="md">Yeni bir teklif ver</Heading>
						<Box>
							<Text>Yeni bir teklif vermek üzeresiniz: </Text>
							<Text>{auction.name}: </Text>
						</Box>
						<Heading size="sm">Teklifin (FB Token)</Heading>
						<Input
							placeholder="Teklifin"
							type="number"
							value={value ? value : ""}
							onChange={e => {
								if (Number(e.target.value) > auction?.buyNowPrice) {
									console.log("merhaba dunya")
									return;
								}
								setValue(Number(e.target.value));
							}}
						/>
						<Text color="blackAlpha.600" fontSize="sm">
							Minimum {humanReadableNumber(minValue).toFixed(2)} FB Token teklifi verebilirsiniz.
						</Text>
						<GoldenFizzButton onClick={propose}>Teklif Ver</GoldenFizzButton>
					</Flex>
				</ModalContent>
			</ModalOverlay>
		</Modal>
	);
}
