import { Flex, Link } from "@chakra-ui/react";
import type { ReactElement } from "react";

export const SideNav = (): ReactElement => {
	return (
		<Flex flexDirection="column" p="20px" gap="15px" fontSize="xl">
			<Link href="/admin">Ana Sayfa</Link>
			<Link href="/admin/create-auction">Açık artırma oluştur</Link>
			<Link href="/admin/update-buy-now-price">Açık Artırmalar</Link>
		</Flex>
	);
};
