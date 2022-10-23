import { Box, Flex, Heading, Input, Modal, ModalContent, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import { ReactElement, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useAuctionClient } from "~/client";
import { GoldenFizzButton, WhiteButton } from "~/components";
import { useAuctionContract } from "~/contracts";
import { loadingModalEventBus, modal1907EventBus } from "~/eventbus";
import { getAuctionContractErrorMessage } from "~/utils";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const ProductCard = ({ auctionId, name, buyNowPrice, highestOffer, photoUrls, endDate }: any): ReactElement => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	// const { register, handleSubmit } = useForm<FormData>({
	// 	resolver: yupResolver(schema),
	// });

	// const auctionContract = useAuctionContract();
	const auctionClient = useAuctionClient();


	const handleupdateBuyNowPriceError = (errors: any) => {
		console.log(errors)
	}

	const finishAuctionMutation = useMutation(
		() => {
			return auctionClient
				.finishAuction({ username: "fb-admin", password: "fb-admin", auctionId })
				.then(res => res.data);
		},
		{
			onSuccess: data => {
				if (data.error) {
					const e = getAuctionContractErrorMessage(data.error);
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
			{/* <Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay></ModalOverlay>
				<ModalContent p="20px">
					<form onSubmit={handleSubmit(updateBuyNowPrice, handleupdateBuyNowPriceError)}>
						<Flex direction="column" gap="10px" color="black">
							<Heading size="md">{name}</Heading>
							<Input type="number" placeholder="Yeni hemen al fiyatı" {...register("newBuyNowPrice")} />
							<GoldenFizzButton type="submit">Güncelle</GoldenFizzButton>
						</Flex>
					</form>
				</ModalContent>
			</Modal> */}
		</Flex>
	);
};
