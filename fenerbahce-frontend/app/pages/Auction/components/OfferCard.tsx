import type { ReactElement } from "react";
import { UserIcon } from "~/assets";
import { Flex, Text, Icon, Box } from "@chakra-ui/react";
import { humanReadableNumber, getShortAddress } from "~/utils";
import { useFBTokenCalculator } from "~/hooks";

interface OfferCardProps {
	withToken: boolean;
	address?: string;
	numberOfTokens: number;
	isWinner?: boolean;
}

export const OfferCard = ({ withToken = false, address, numberOfTokens, isWinner }: OfferCardProps): ReactElement => {

	const fbTokenCalculator = useFBTokenCalculator();

	const bg = isWinner ? "var(--golden-fizz)" : "var(--governor-bay)";
	const color = isWinner ? "var(--governor-bay)" : "white";

	const UserIcon2 = () => {
		return (
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				h="40px"
				w="40px"
				bg={isWinner ? "var(--governor-bay)" : "var(--golden-fizz)"}
				borderRadius="50%">
				<UserIcon fill={isWinner ? "var(--golden-fizz)" : "#1B2F6E"} />
			</Box>
		);
	};

	return (
		<Flex gap="10px" bg={bg} alignItems="center" borderRadius="10px" padding="10px" color={color}>
			<Icon as={UserIcon2} />
			<Text fontSize="18px">{address && getShortAddress(address)}</Text>
			<Flex direction="column" ml="auto" alignItems="flex-end">
				<Text fontSize={withToken ? "22px" : "18px"} fontWeight="bold">
					{humanReadableNumber(numberOfTokens * fbTokenCalculator.price)} ₺
				</Text>
				{withToken && <Text>{numberOfTokens} FB</Text>}
			</Flex>
		</Flex>
	);
};
