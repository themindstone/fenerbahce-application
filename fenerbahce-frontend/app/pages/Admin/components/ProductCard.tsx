import { Box, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import { ReactElement } from "react";
import { GoldenFizzButton } from "~/components";

export const ProductCard = ({ name, buyNowPrice, photoUrls, endDate, isFinished = false }: any): ReactElement => {
	const { onOpen } = useDisclosure();

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
			{!isFinished && <GoldenFizzButton onClick={onOpen}>Hemen Al Fiyatını Güncelle</GoldenFizzButton>}
		</Flex>
	);
};
