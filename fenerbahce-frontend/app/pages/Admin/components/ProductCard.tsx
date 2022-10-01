import { Box, Flex, Heading, Input, Modal, ModalContent, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import { ReactElement, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useAuctionClient } from "~/client";
import { GoldenFizzButton, WhiteButton } from "~/components";
import { useAuctionContract } from "~/contracts";
import { modal1907EventBus } from "~/eventbus";
import { getAuctionContractErrorMessage } from "~/utils";

export const ProductCard = ({ auctionId, name, buyNowPrice, highestOffer, photoUrls, endDate }: any): ReactElement => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { register, handleSubmit } = useForm();

	const auctionContract = useAuctionContract();
	const auctionClient = useAuctionClient();

	const updateBuyNowPrice = useCallback(
		async ({ newBuyNowPrice }: any) => {
			const { isError, errorMessage } = await auctionContract.updateBuyNowPrice({ auctionId, newBuyNowPrice });
			console.log(isError, errorMessage);
			if (isError && errorMessage) {
				console.log("herhalde oluyor");
				modal1907EventBus.publish("modal.open", { isSucceed: false, description: errorMessage });
				// we need to show a modal in case of errors to the user
				return;
			}

			onClose();
		},
		[auctionContract],
	);

	const finishAuctionMutation = useMutation(
		() => {
			return auctionClient
				.finishAuction({ username: "fb-admin", password: "fb-admin", auctionId })
				.then(res => res.data);
		},
		{
			onSuccess: data => {
				// console.log("options:", options)
				console.log(data);
				if (data.error) {
					const e = getAuctionContractErrorMessage(data.error);
					console.log(data.error, e);
					if (!e) {
						return;
					}
					modal1907EventBus.publish("modal.open", { isSucceed: false, description: e });
				} else if (data.message) {
					if (data.message === "Auction max offer will be burnt in Paribu") {
						modal1907EventBus.publish("modal.open", {
							isSucceed: true,
							description: "En yüksek teklif paribuda yakılıyor",
						});
					} else if (data.message === "There is no user paying that auction") {
						modal1907EventBus.publish("modal.open", {
							isSucceed: true,
							description: "Bu açık artırma için teklif veren henüz kimse yok",
						});
					} else if (data.message === "success") {
						modal1907EventBus.publish("modal.open", {
							isSucceed: true,
							description: "Açık artırma başarıyla sonlandı.",
						});
					}
				}
			},
		},
	);

	return (
		<Flex bg="var(--governor-bay)" p="10px" borderRadius="10px" direction="column" gap="10px">
			<Box
				w="100%"
				bgImage={`url(${photoUrls[0]})`}
				bgSize="cover"
				borderRadius="5px"
				style={{ aspectRatio: "1" }}></Box>
			<Heading size="md">{name}</Heading>
			<Text>Hemen Al Fiyat: {buyNowPrice} FB</Text>
			<Text>
				Bitiş Tarihi: {moment(new Date(endDate).getTime()).locale("tr").format("MMMM Do YYYY, h:mm:ss a")}
			</Text>
			<WhiteButton onClick={() => finishAuctionMutation.mutate()}>Açık Artırmayı Bitir</WhiteButton>
			<GoldenFizzButton onClick={onOpen}>Hemen Al Fiyatını Güncelle</GoldenFizzButton>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay></ModalOverlay>
				<ModalContent p="20px">
					<form onSubmit={handleSubmit(updateBuyNowPrice)}>
						<Flex direction="column" gap="10px" color="black">
							<Heading size="md">{name}</Heading>
							<Input type="text" placeholder="Yeni hemen al fiyatı" {...register("newBuyNowPrice")} />
							<GoldenFizzButton type="submit">Güncelle</GoldenFizzButton>
						</Flex>
					</form>
				</ModalContent>
			</Modal>
		</Flex>
	);
};