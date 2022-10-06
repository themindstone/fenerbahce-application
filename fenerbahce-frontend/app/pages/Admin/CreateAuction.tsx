import { Box, Flex, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { GoldenFizzButton } from "~/components";
import { Layout } from "~/admincomponents";
import { loadingModalEventBus, modal1907EventBus } from "~/eventbus";
import { useForm } from "react-hook-form";
import { AuctionClient } from "~/client";

// we need to list products in this page
export const CreateAuction = () => {
	const [auctionPhotosInputCount, setAuctionPhotosInputCount] = useState<number>(1);

	const { handleSubmit, register } = useForm();

	const increase = () => {
		setAuctionPhotosInputCount(auctionPhotosInputCount + 1);
	};

	const decrease = () => {
		if (auctionPhotosInputCount === 1) {
			return;
		}
		setAuctionPhotosInputCount(auctionPhotosInputCount - 1);
	};

	const arr = useMemo(
		() =>
			Array(auctionPhotosInputCount)
				.fill(0)
				.map((item, index) => {
					return index + 1;
				}),
		[auctionPhotosInputCount],
	);

	const createAuction = async ({
		username,
		password,
		name,
		startPrice,
		buyNowPrice,
		bidIncrement,
		photoUrls,
		startDate,
		endDate,
	}: any) => {
		console.log("merhaba dunya");
		if (
			!Number(startPrice) ||
			!Number(buyNowPrice) ||
			!Number(bidIncrement) ||
			!new Date(startDate).getTime() ||
			!new Date(endDate).getTime()
		) {
			modal1907EventBus.publish("modal.open", {
				isSucceed: false,
				description: "Form bilgilerinde hata var, tekrar deneyiniz.",
			});
			return;
		}
		if (new Date(endDate).getTime() <= new Date(startDate).getTime()) {
			modal1907EventBus.publish("modal.open", {
				isSucceed: false,
				description: "Başlangıç tarihi bitiş tarihinden sonra olamaz!",
			});
			return;
		}
		if (new Date(endDate).getTime() <= new Date().getTime()) {
			modal1907EventBus.publish("modal.open", {
				isSucceed: false,
				description: "Bitiş tarihi bugünden daha erken olamaz!",
			});
			return;
		}
		if (buyNowPrice <= startPrice) {
			modal1907EventBus.publish("modal.open", {
				isSucceed: false,
				description: "Hemen al fiyatı, başlangıç fiyatından daha düşük olamaz!",
			});
			return;
		}
		try {
			loadingModalEventBus.publish("loadingmodal.open", { message: "Açık artırma oluşturuluyor" });
			await AuctionClient.create({
				username,
				password,
				name,
				startPrice: Number(startPrice),
				buyNowPrice: Number(buyNowPrice),
				bidIncrement: Number(bidIncrement),
				photoUrls,
				startDate: new Date(startDate).toISOString(),
				endDate: new Date(endDate).toISOString(),
			});
			modal1907EventBus.publish("modal.open", {
				isSucceed: true,
				description: "Açık artırma başarıyla oluşturuldu.",
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

	return (
		<Layout>
			<Box maxW="1000px" margin="auto">
				<form onSubmit={handleSubmit(createAuction)}>
					<Flex direction="column" gap="10px" padding="40px">
						<Heading>Ürün Ekle</Heading>
						<Input type="hidden" name="_method" defaultValue="add_product" />
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Kullanıcı Adı</Text>
							<Input
								placeholder="username"
								defaultValue="fb-admin"
								{...register("username", { required: true })}
							/>
						</FormLabel>
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Şifre</Text>
							<Input
								placeholder="password"
								defaultValue="fb-admin"
								{...register("password", { required: true })}
							/>
						</FormLabel>
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Ürün Adı</Text>
							<Input
								placeholder="urun adi"
								{...register("name", { required: true })}
								defaultValue="Maçta Giyilmiş Fenerbahçe - Hull City Özel Fenerbahçe Token Forması"
							/>
						</FormLabel>
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Ürün Fotoğraf Url Bilgileri</Text>
							<Flex gap="20px" alignSelf="stretch">
								<Flex direction="column" gap="15px" flexGrow="1">
									{arr.map((item, index) => {
										return (
											<Input
												defaultValue="https://fenerbahce-auction-bucket.s3.eu-central-1.amazonaws.com/forma1.jpg"
												placeholder="urun fotograflari"
												{...register(`photoUrls[${index}]`, { required: true })}
												key={`product-photos-${item}`}
											/>
										);
									})}
								</Flex>
								<Flex gap="10px">
									<GoldenFizzButton onClick={increase}>Ekle</GoldenFizzButton>
									<GoldenFizzButton onClick={decrease}>Çıkar</GoldenFizzButton>
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
								placeholder="baslangic tarih (ay-gun-yil)"
								defaultValue="09-09-2022"
								{...register("startDate", { required: true })}
							/>
						</FormLabel>
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Açık Artırma Bitiş Tarihi (ay-gun-yıl)</Text>
							<Input
								placeholder="bitis tarih (ay-gun-yil)"
								{...register("endDate")}
								defaultValue="09/19/2022 14:24:11"
							/>
						</FormLabel>
						<GoldenFizzButton alignSelf="start" type="submit">
							Ekle
						</GoldenFizzButton>
					</Flex>
				</form>
			</Box>
		</Layout>
	);
};
