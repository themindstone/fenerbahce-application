import type { ReactElement } from "react";
import { UserIcon } from "~/assets";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { humanReadableNumber, getShortAddress } from "~/utils";

interface OfferCardProps {
	withToken: boolean;
	address?: string;
	numberOfTokens: number;
	isWinner?: boolean;
}

export const OfferCard = ({ withToken = false, address, numberOfTokens, isWinner }: OfferCardProps): ReactElement => {

	const bg = isWinner ? "var(--golden-fizz)" : "var(--governor-bay)";
	const color = isWinner ? "var(--governor-bay)" : "var(--golden-fizz)";

	return (
		<Flex gap="10px" bg="var(--governor-bay)" alignItems="center" borderRadius="10px" padding="10px">
			<Icon as={UserIcon} p="10px" h="40px" w="40px" bg="var(--golden-fizz)" borderRadius="50%" />
			<Text fontSize="18px">{address && getShortAddress(address)}</Text>
			<Flex direction="column" ml="auto" alignItems="flex-end">
				<Text fontSize={withToken ? "22px" : "18px"} fontWeight="bold">
					{humanReadableNumber(numberOfTokens * 36.05)}0 ₺
				</Text>
				{withToken && <Text>{numberOfTokens} FB</Text>}
			</Flex>
		</Flex>
	);
};
