import type { ReactElement } from "react";
import { Box, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { homeutility } from "~/data";
import type { IHomeUtility } from "~/interfaces";
import { Carousel } from "~/components";

interface AdvantageCardProps extends IHomeUtility {}


const options = {
    loop: false,
    responsive: {
        800: { items: 4, dots: false },
        600: { items: 3 },
        500: { items: 2 },
        0: {
            items: 1,
            dots: true
        }
    }
}

const AdvantageCard = (props: AdvantageCardProps): ReactElement => {

    return (<VStack>
        <Flex direction="column" gap="20px" p="20px" maxW="300px">
            <Image width="100px" src={props.avatarUrl} />
            <Heading size="sm" fontWeight="extrabold">{props.title}</Heading>
            <Text>{props.text}</Text>
        </Flex>
    </VStack>);
}

export const Advantages = (): ReactElement => {

    return (<Flex direction="column" maxW="1200px" m="100px auto" gap="30px" alignItems="center" textAlign="center">
        <Heading maxW="30ch">Fenerbahce Token taraftarlara hangi avantajlari saglayacak?</Heading>
        <Carousel options={options}>
            {homeutility.map((item, index) => {
                return (<AdvantageCard
                    key={index}
                    avatarUrl={item.avatarUrl}
                    title={item.title}
                    text={item.text}
                />)
            })}
        </Carousel>
    </Flex>);
};