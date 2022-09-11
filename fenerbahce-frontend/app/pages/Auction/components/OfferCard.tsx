import type { ReactElement } from "react";
import { UserIcon } from "~/assets";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { humanReadableNumber } from "~/utils";

interface OfferCardProps {
    withToken: boolean;
    address?: string;
    numberOfTokens: number;
};

export const OfferCard = ({
    withToken = false,
    address,
    numberOfTokens
}: OfferCardProps): ReactElement => {
	return (
		<Flex gap="10px" bg="var(--governor-bay)" alignItems="center" borderRadius="10px" padding="10px">
            <Icon as={UserIcon} p="10px" h="40px" w="40px" bg="var(--golden-fizz)" borderRadius="50%" />
            <Text fontSize="18px">0x2r3t...3vR2</Text>
            <Flex direction="column" ml="auto" alignItems="flex-end">
                <Text fontSize={withToken ? "22px" : "18px"} fontWeight="bold">
                    {humanReadableNumber(numberOfTokens * 36.05)}0 ₺
                </Text>
                {withToken &&
                    <Text>{numberOfTokens} KNRY</Text>
                }
            </Flex>
		</Flex>
	);
};
