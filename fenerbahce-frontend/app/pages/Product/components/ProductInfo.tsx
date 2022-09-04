import { Box, Flex, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { Fragment, ReactElement } from "react";
import { PlusIcon, UserIcon } from "~/assets";
import { GoldenFizzButton, WhiteButton } from "~/components";
import { useCountdownTimer } from "~/hooks";
import useCollapse from 'react-collapsed';

interface OfferCardProps {
    withToken: boolean;
};

interface CollapsibleCardInterface {
    title: string;
    content: string;
};

const TimeLeftBox = (props: { text: string; left: string }) => {
	return (
		<VStack bg="var(--governor-bay)" w="120px" h="120px" borderRadius="20px" justifyContent="center">
			<Text fontWeight="bold" fontSize="70px" lineHeight="50px">
				{props.left}
			</Text>
			<Text fontSize="14px" color="rgba(255, 255, 255, 0.8)">
				{props.text}
			</Text>
		</VStack>
	);
};

const OfferCard = ({
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

const CollapsibleCard = ({
    title,
    content,
}: CollapsibleCardInterface): ReactElement => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    return (<Flex direction="column" gap="10px">
        <Flex {...getToggleProps()} alignItems="center" borderRadius="5px" border="1px solid #CACEDB" p="10px" justifyContent="space-between">
            <Text>{title}</Text>
            <Text>
                {/* {isExpanded ? 'Collapse' : 'Expand'} */}
                <PlusIcon height="20px" width="24px" />
            </Text>
        </Flex>
        <Box {...getCollapseProps()}>
            <Box borderRadius="5px" border="1px solid #CACEDB" p="10px">
                {content}
            </Box>
        </Box>
    </Flex>);
};

export const ProductInfo = (): ReactElement => {
	const { days, hours, minutes } = useCountdownTimer("10/07/2022");

	return (
		<Box>
			<Flex direction="column" maxW="400px" gap="30px">
				<Heading>Ömer Faruk Beyazın İlk Lig Maçı Forması</Heading>
				<Flex direction="column" gap="10px">
					<Text>Kalan süre</Text>
					<Flex gap="20px">
						<TimeLeftBox left={days} text="GÜN"></TimeLeftBox>
						<TimeLeftBox left={hours} text="SAAT"></TimeLeftBox>
						<TimeLeftBox left={minutes} text="DAKİKA"></TimeLeftBox>
					</Flex>
				</Flex>
				<Flex gap="10px" direction="column" alignItems="stretch">
					<WhiteButton>HEMEN AL 150,000₺</WhiteButton>
					<GoldenFizzButton>TEKLİF VER</GoldenFizzButton>
				</Flex>
				<Flex direction="column" gap="10px">
					<Text>En Yüksek Teklif</Text>
					<OfferCard withToken={true} />
				</Flex>

                <Flex direction="column" gap="10px">
					<Text>Diğer Teklifler</Text>
					<OfferCard withToken={false} />
					<OfferCard withToken={false} />
					<OfferCard withToken={false} />
				</Flex>
                <Flex gap="15px" direction="column">
                    <CollapsibleCard title="Deneyimin detayları" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo officiis totam repellat odit eum accusamus blanditiis rem quod fugit, minus sapiente magni corporis qui beatae amet eligendi dolore cupiditate porro." />
                    <CollapsibleCard title="Deneyimin özellikleri" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo officiis totam repellat odit eum accusamus blanditiis rem quod fugit, minus sapiente magni corporis qui beatae amet eligendi dolore cupiditate porro." />
                    <CollapsibleCard title="Şartlar" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo officiis totam repellat odit eum accusamus blanditiis rem quod fugit, minus sapiente magni corporis qui beatae amet eligendi dolore cupiditate porro." />
                </Flex>
			</Flex>
		</Box>
	);
};
