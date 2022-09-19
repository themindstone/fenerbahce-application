import { Box, Flex, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { Fragment, useMemo, useState } from "react";
import { GoldenFizzButton } from "~/components";
import { Header, Layout } from "~/admincomponents";

// we need to list products in this page
export const CreateAuction = () => {
	const [auctionPhotosInputCount, setAuctionPhotosInputCount] = useState<number>(1);

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

	return (
		<Layout>
			<Box maxW="1000px" margin="auto">
				<Form method="post">
					<Flex direction="column" gap="10px" padding="40px">
						<Heading>Ürün Ekle</Heading>
						<Input type="hidden" name="_method" defaultValue="add_product" />
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Kullanıcı Adı</Text>
							<Input name="username" placeholder="username" defaultValue="fb-admin" />
						</FormLabel>
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Şifre</Text>
							<Input name="password" placeholder="password" defaultValue="fb-admin" />
						</FormLabel>
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Ürün Adı</Text>
							<Input
								placeholder="urun adi"
								name="name"
								defaultValue="Ömer Faruk Beyazın İlk Lig Maçı Forması"
							/>
						</FormLabel>
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Ürün Fotoğraf Url Bilgileri</Text>
							<Flex gap="20px" alignSelf="stretch">
								<Flex direction="column" gap="15px" flexGrow="1">
									{arr.map(item => {
										return (
											<Input
												defaultValue="/build/_assets/uniform-W6QJQIUR.png"
												placeholder="urun fotograflari"
												name={`photoUrls[]`}
												key={`product-photos-${item}`}
											/>
										);
									})}
								</Flex>
								<Flex gap="10px">
									<GoldenFizzButton onClick={increase}>Plus</GoldenFizzButton>
									<GoldenFizzButton onClick={decrease}>Minus</GoldenFizzButton>
								</Flex>
							</Flex>
						</FormLabel>
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Açık Artırma Başlangıç Fiyatı</Text>
							<Input placeholder="urun baslangic fiyat" name="startPrice" defaultValue="1.5" />
						</FormLabel>
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Açık Artırma Hemen Al Fiyatı</Text>
							<Input placeholder="urun hemen al fiyat" name="buyNowPrice" defaultValue="15" />
						</FormLabel>
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Açık Artırma Artış Fiyatı</Text>
							<Input placeholder="urun hemen al fiyat" name="bidIncrement" defaultValue="0.1" />
						</FormLabel>
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Açık Artırma Başlangıç Tarihi (ay-gun-yıl)</Text>
							<Input
								placeholder="baslangic tarih (ay-gun-yil)"
								name="startDate"
								defaultValue="09-09-2022"
							/>
						</FormLabel>
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Açık Artırma Bitiş Tarihi (ay-gun-yıl)</Text>
							<Input placeholder="bitis tarih (ay-gun-yil)" name="endDate" defaultValue="09/18/2022 01:24:11" />
						</FormLabel>
						<GoldenFizzButton alignSelf="start" type="submit">
							Ekle
						</GoldenFizzButton>
					</Flex>
				</Form>
			</Box>
		</Layout>
	);
};
