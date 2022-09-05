import type { ReactElement } from "react";
import { UserIcon } from "~/assets";
import { Flex, Text, Icon } from "@chakra-ui/react";

interface OfferCardProps {
    withToken: boolean;
};

export const OfferCard = ({
    withToken = false,
}: OfferCardProps): ReactElement => {
	return (
		<Flex gap="10px" bg="var(--governor-bay)" alignItems="center" borderRadius="10px" padding="10px">
            <Icon as={UserIcon} p="10px" h="40px" w="40px" bg="var(--golden-fizz)" borderRadius="50%" />
            <Text fontSize="18px">0x2r3t...3vR2</Text>
            <Flex direction="column" ml="auto" alignItems="flex-end">
                <Text fontSize={withToken ? "22px" : "18px"} fontWeight="bold">90,045.20 ₺</Text>
                {withToken &&
                    <Text>2500.91 KNRY</Text>
                }
            </Flex>
		</Flex>
	);
};
