import { Box, Flex, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { Fragment, useMemo, useState } from "react";
import { Footer, GoldenFizzButton, Header } from "~/components";

export const Admin = () => {
	const [productPhotosInputCount, setProductPhotosInputCount] = useState<number>(1);

	const increase = () => {
		setProductPhotosInputCount(productPhotosInputCount + 1);
	};

	const decrease = () => {
		if (productPhotosInputCount === 1) {
			return;
		}
		setProductPhotosInputCount(productPhotosInputCount - 1);
	};

	const arr = useMemo(
		() =>
			Array(productPhotosInputCount)
				.fill(0)
				.map((item, index) => {
					return index + 1;
				}),
		[productPhotosInputCount],
	);

	return (
		<Fragment>
			<Header />
			<Box maxW="1000px" margin="auto">
				<Form method="post">
					<Flex direction="column" gap="10px" padding="40px">
						<Heading>Ürün Ekle</Heading>
						<Input type="hidden" name="_method" value="add_product" />
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Kullanıcı Adı</Text>
							<Input name="username" placeholder="username" />
						</FormLabel>
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Şifre</Text>
							<Input name="password" placeholder="password" />
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
							<Input placeholder="urun baslangic fiyat" name="auctionStartPrice" />
						</FormLabel>
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Açık Artırma Hemen Al Fiyatı</Text>
							<Input placeholder="urun hemen al fiyat" name="auctionImmediatePrice" />
						</FormLabel>
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Açık Artırma Başlangıç Tarihi (ay-gun-yıl)</Text>
							<Input placeholder="baslangic tarih (ay-gun-yil)" name="startDate" />
						</FormLabel>
						<FormLabel gap="5px" display="flex" flexDirection="column">
							<Text>Açık Artırma Bitiş Tarihi (ay-gun-yıl)</Text>
							<Input placeholder="bitis tarih (ay-gun-yil)" name="endDate" />
						</FormLabel>
						<GoldenFizzButton alignSelf="start" type="submit">
							Ekle
						</GoldenFizzButton>
					</Flex>
				</Form>
			</Box>
			<Footer />
		</Fragment>
	);
};
