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
import { useMutation, useQuery } from "react-query";
import { Layout } from "~/admincomponents";
import { useAuctionClient } from "~/client";
import { GoldenFizzButton, WhiteButton } from "~/components";
import { useAuctionContract } from "~/contracts";
import { useForm } from "react-hook-form";
import moment from "moment";
import { adminResultEventBus } from "~/eventbus";
import { AdminModal } from "./components";

const ProductCard = ({ auctionId, name, buyNowPrice, highestOffer, photoUrls, endDate }: any): ReactElement => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { register, handleSubmit } = useForm();

	const auctionContract = useAuctionContract();
	const auctionClient = useAuctionClient();


	const updateBuyNowPrice = useCallback(
		async ({ newBuyNowPrice }: any) => {
			const { isError, errorMessage } = await auctionContract.updateBuyNowPrice({ auctionId, newBuyNowPrice });
			console.log(isError, errorMessage)
			if (isError && errorMessage) {
				console.log("herhalde oluyor")
				adminResultEventBus.publish("adminresult.open", { isSucceed: false, description: errorMessage })
				// we need to show a modal in case of errors to the user
				return;
			}

			onClose();
		},
		[auctionContract],
	);

	const finishAuctionMutation = useMutation(() => {
		return auctionClient.finishAuction({ username: "fb-admin", password: "fb-admin", auctionId });
	});

	return (
		<Flex bg="var(--governor-bay)" p="10px" borderRadius="10px" direction="column" gap="10px">
			<Box
				w="100%"
				bgImage={`url(${photoUrls[0]})`}
				bgSize="cover"
				borderRadius="5px"
				style={{ aspectRatio: "1" }}></Box>
			<Heading size="md">{name}</Heading>
			<Text>Hemen Al Fiyat: {buyNowPrice} TL</Text>
			<Text>Bitiş Tarihi: {moment(new Date(endDate).getTime()).locale("tr").format("MMMM Do YYYY, h:mm:ss a")}</Text>
			<WhiteButton onClick={() => finishAuctionMutation.mutate()}>Finish Auction and Refund Money</WhiteButton>
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
							highestOffer={product.highestOffer}
							endDate={product.endDate}></ProductCard>
					);
				})}
			</Grid>
			<AdminModal></AdminModal>
		</Layout>
	);
};
