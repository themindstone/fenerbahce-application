import { Box, Flex, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { GoldenFizzButton } from "~/components";
import { loadingModalEventBus, modal1907EventBus } from "~/eventbus";
import type { SubmitErrorHandler } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { AuctionClient } from "~/client";
import type { CreateAuctionFormType } from "./schema";
import { useCreateAuctionForm } from "./schema";

// we need to list products in this page
export const CreateAuction = () => {
	const { handleSubmit, register, control } = useCreateAuctionForm();

	const photoUrls = useFieldArray({
		control,
		name: "photoUrls",
	});

	const decrease = (index: number | undefined) => {
		photoUrls.remove(index ? index : photoUrls.fields.length - 1);
	};

	const createAuction = async ({
		name,
		startPrice,
		buyNowPrice,
		bidIncrement,
		photoUrls,
		startDate,
		endDate,
	}: CreateAuctionFormType) => {
		try {
			loadingModalEventBus.publish("loadingmodal.open", { message: "Açık artırma oluşturuluyor" });
			await AuctionClient.create({
				name,
				startPrice: startPrice,
				buyNowPrice: buyNowPrice,
				bidIncrement: bidIncrement,
				photoUrls,
				startDate: new Date(startDate).toISOString(),
				endDate: new Date(endDate).toISOString(),
			});
			modal1907EventBus.publish("modal.open", {
				isSucceed: true,
				description: "Açık artırma oluşturuldu.",
			});
		} catch (error: any) {
			modal1907EventBus.publish("modal.open", {
				isSucceed: false,
				description: "Açık artırma oluşturulurken bir hata meydana geldi.",
			});
		} finally {
			loadingModalEventBus.publish("loadingmodal.close");
		}
	};

	const handleErrors: SubmitErrorHandler<CreateAuctionFormType> = (errors: any) => {
		if (!errors) {
			return;
		}
		const firstItem = errors[Object.keys(errors)[0]];
		if (Array.isArray(firstItem)) {
			const messages = firstItem.filter(item => !!item);
			console.log(messages);
			if (messages[0].photoUrl) {
				modal1907EventBus.publish("modal.open", {
					isSucceed: false,
					description: messages[0].photoUrl.message,
				});
			}
		} else if (errors) {
			modal1907EventBus.publish("modal.open", {
				isSucceed: false,
				description: errors[Object.keys(errors)[0]].message,
			});
		}
	};

	useEffect(() => {
		photoUrls.append({ photoUrl: "https://fenerbahce-auction-bucket.s3.eu-central-1.amazonaws.com/forma1.jpg" });
	}, []);

	return (
		<Box maxW="1000px" margin="auto">
			<form onSubmit={handleSubmit(createAuction, handleErrors)}>
				<Flex direction="column" gap="10px" padding="40px">
					<Heading>Ürün Ekle</Heading>
					<Input type="hidden" name="_method" defaultValue="add_product" />
					<FormLabel gap="5px" display="flex" flexDirection="column">
						<Text>Ürün Adı</Text>
						<Input
							placeholder="urun adi"
							{...register("name")}
							defaultValue="Maçta Giyilmiş Fenerbahçe - Hull City Özel Fenerbahçe Token Forması"
						/>
					</FormLabel>
					<FormLabel>
						<Text>Ürün Fotoğrafları</Text>
						<Flex gap="20px" alignSelf="stretch">
							<Flex direction="column" gap="15px" flexGrow="1">
								{photoUrls.fields.map((item, index) => {
									return (
										<Flex gap="10px">
											<Input
												placeholder="urun fotograflari"
												{...register(`photoUrls.${index}.photoUrl`)}
												key={`product-photos-${Math.random()}`}
											/>
											<GoldenFizzButton onClick={() => decrease(index)}>Çıkar</GoldenFizzButton>
										</Flex>
									);
								})}
							</Flex>
							<Flex gap="10px">
								<GoldenFizzButton onClick={() => photoUrls.append({ photoUrl: "" })}>
									Ekle
								</GoldenFizzButton>
							</Flex>
						</Flex>
					</FormLabel>
					<FormLabel gap="5px" display="flex" flexDirection="column">
						<Text>Açık Artırma Başlangıç Fiyatı</Text>
						<Input
							placeholder="urun baslangic fiyat"
							defaultValue="1.5"
							{...register("startPrice", { required: true })}
						/>
					</FormLabel>
					<FormLabel gap="5px" display="flex" flexDirection="column">
						<Text>Açık Artırma Hemen Al Fiyatı</Text>
						<Input
							placeholder="urun hemen al fiyat"
							defaultValue="15"
							{...register("buyNowPrice", { required: true })}
						/>
					</FormLabel>
					<FormLabel gap="5px" display="flex" flexDirection="column">
						<Text>Açık Artırma Artış Fiyatı</Text>
						<Input
							placeholder="Açık Artırma Artış Fiyatı"
							defaultValue="0.1"
							{...register("bidIncrement", { required: true })}
						/>
					</FormLabel>
					<FormLabel gap="5px" display="flex" flexDirection="column">
						<Text>Açık Artırma Başlangıç Tarihi (ay-gun-yıl)</Text>
						<Input
							placeholder="ay/gun/yıl saat:dakika:saniye"
							defaultValue="10/25/2022 14:24:11"
							{...register("startDate")}
						/>
					</FormLabel>
					<FormLabel gap="5px" display="flex" flexDirection="column">
						<Text>Açık Artırma Bitiş Tarihi (ay-gun-yıl)</Text>
						<Input
							placeholder="ay/gun/yıl saat:dakika:saniye"
							{...register("endDate")}
							defaultValue="10/25/2022 14:24:11"
						/>
					</FormLabel>
					<GoldenFizzButton alignSelf="start" type="submit">
						Ekle
					</GoldenFizzButton>
				</Flex>
			</form>
		</Box>
	);
};
