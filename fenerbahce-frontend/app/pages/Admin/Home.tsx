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
import { useState } from "react";
import type { ReactElement } from "react";
import { useMutation, useQuery } from "react-query";
import { Layout } from "~/admincomponents";
import { useAuctionClient } from "~/client";
import { GoldenFizzButton, WhiteButton } from "~/components";
import { SubmitHandler, useForm } from "react-hook-form";
import moment from "moment";
import { loadingModalEventBus, modal1907EventBus } from "~/eventbus";
import { AdminModal } from "./components";
import { getAuctionContractErrorMessage } from "~/utils";
import { fbTokenAddress } from "~/data";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
	newBuyNowPrice: yup.number().required("Lütfen yeni satın alma fiyatını giriniz."),
});

type FormData = yup.InferType<typeof schema>;

const ProductCard = ({ auctionId, name, buyNowPrice, highestOffer, photoUrls, endDate }: any): ReactElement => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { register, handleSubmit } = useForm<FormData>({ resolver: yupResolver(schema) });

	// const auctionContract = useAuctionContract();
	const auctionClient = useAuctionClient();

	const updateBuyNowPriceMutation = useMutation(
		async ({ newBuyNowPrice }: FormData) => {
			const res = await auctionClient.updateAuction({ auctionId, buyNowPrice: newBuyNowPrice });
			return res.data;
		},
		{
			onSuccess: () => {
				onClose();
			},
			onError: error => {
				modal1907EventBus.publish("modal.open", {
					isSucceed: false,
					description: "Hemen al fiyatını güncellerken bir hata oluştu.",
				});
			},
			onSettled: () => {
				// we can do something here
				loadingModalEventBus.publish("loadingmodal.close");
			},
		},
	);

	const updateBuyNowPrice: SubmitHandler<FormData> = (data: FormData) => {
		loadingModalEventBus.publish("loadingmodal.open", { message: "Hemen al fiyatı güncelleniyor..." });
		updateBuyNowPriceMutation.mutate(data);
	};

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
				bgImage={`url(${photoUrls[0].photoUrl})`}
				bgSize="cover"
				borderRadius="5px"
				style={{ aspectRatio: "1" }}></Box>
			<Heading size="md">{name}</Heading>
			<Text>Hemen Al Fiyat: {buyNowPrice} FB</Text>
			<Text>
				Bitiş Tarihi: {moment(new Date(endDate).getTime()).locale("tr").format("MMMM Do YYYY, h:mm:ss a")}
			</Text>
			{/* <WhiteButton onClick={() => finishAuctionMutation.mutate()}>Açık Artırmayı Bitir</WhiteButton> */}
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

export const Home = (): ReactElement => {
	const [pageNumber] = useState<number>(1);
	const [auctionByPage] = useState<number>(10);

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
		return <Box></Box>;
	}

	const addTokenToMetamask = () => {
		if (!window.ethereum) {
			return;
		}
		const ethereum = window.ethereum as any;
		ethereum.request({
			method: "wallet_watchAsset",
			params: {
				type: "ERC20",
				options: {
					address: fbTokenAddress[config.NODE_ENV],
					symbol: "FB",
					decimals: 18,
				},
			},
		});
	};

	return (
		<Layout authenticationRequired={true}>
			<Flex gap="10px" margin="20px 0">
				<GoldenFizzButton onClick={addTokenToMetamask}>Tokeni Metamask'a Ekle</GoldenFizzButton>
				<GoldenFizzButton
					onClick={() => {
						window.location.href = "/admin/create-auction";
					}}>
					Açık Artırma Oluştur
				</GoldenFizzButton>
			</Flex>
			<Grid gridTemplateColumns="1fr 1fr 1fr" gap="20px">
				{(auctions.data as any[]).map((product: any) => {
					if (product.endDate < new Date().getTime() || product.isSelled) {
						return <></>
					}
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