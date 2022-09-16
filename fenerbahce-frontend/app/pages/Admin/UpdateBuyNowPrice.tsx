import {
	Box,
	Flex,
	Grid,
	Heading,
	Modal,
	ModalContent,
	ModalOverlay,
	Text,
	useDisclosure,
	Input,
} from "@chakra-ui/react";
import { ReactElement, useCallback, useState } from "react";
import { useQuery } from "react-query";
import { Layout } from "~/admincomponents";
import { useAuctionClient } from "~/client";
import { GoldenFizzButton, WhiteButton } from "~/components";
import { useAuctionContract } from "~/contracts";
import { useForm } from "react-hook-form";
import { useConnectWallet } from "~/context";

const ProductCard = ({ auctionId, name, buyNowPrice, highestOffer, photoUrls }: any): ReactElement => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { register, handleSubmit } = useForm();

	const auctionContract = useAuctionContract();

	const updateBuyNowPrice = useCallback(async ({ newBuyNowPrice }: any) => {
		const { isError, errorMessage } = await auctionContract.updateBuyNowPrice({ auctionId, newBuyNowPrice });
		if (isError) {
			console.log(errorMessage);
			// we need to show a modal in case of errors to the user
			return;
		}
	}, [auctionContract]);

	return (
		<Flex bg="var(--governor-bay)" p="10px" borderRadius="10px" direction="column" gap="10px">
			<Box
				w="100%"
				bgImage={`url(${photoUrls[0]})`}
				bgSize="cover"
				borderRadius="5px"
				style={{ aspectRatio: "1" }}></Box>
			<Heading size="md">{name}</Heading>
			<Text>{buyNowPrice} TL</Text>
			<WhiteButton>Refund</WhiteButton>
			<GoldenFizzButton onClick={onOpen}>Update Buy Now Price</GoldenFizzButton>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay></ModalOverlay>
				<ModalContent p="20px">
					<form onSubmit={handleSubmit(updateBuyNowPrice)}>
						<Flex direction="column" gap="10px" color="black">
							<Heading size="md">{name}</Heading>
							<Input type="text" placeholder="new buy now price" {...register("newBuyNowPrice")} />
							<GoldenFizzButton type="submit">Update</GoldenFizzButton>
						</Flex>
					</form>
				</ModalContent>
			</Modal>
		</Flex>
	);
};

export const UpdateBuyNowPrice = (): ReactElement => {
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [auctionByPage, setAuctionByPage] = useState<number>(10);

	const auctionClient = useAuctionClient();

	const connectWallet = useConnectWallet()
	console.log(connectWallet.isConnected)

	const auctions = useQuery(["auctionsByPage", pageNumber, auctionByPage], () => {
		return auctionClient
			.getAuctionsByPage({
				page: pageNumber,
				auctionByPage,
			})
			.then(res => res.data);
	});

	if (!auctions.data) {
		return <Box>data nyok</Box>;
	}

	return (
		<Layout>
			<Grid gridTemplateColumns="1fr 1fr 1fr" gap="20px">
				{(auctions.data as any[]).map((product: any) => {
					return (
						<ProductCard
							key={product.id}
							auctionId={product.id}
							name={product.name}
							buyNowPrice={product.buyNowPrice}
							photoUrls={product.photoUrls}
							highestOffer={product.highestOffer}></ProductCard>
					);
				})}
			</Grid>
		</Layout>
	);
};
