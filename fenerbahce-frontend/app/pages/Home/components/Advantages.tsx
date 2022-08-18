import type { ReactElement } from "react";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { homeutility } from "~/data";
import type { IHomeUtility } from "~/interfaces";
// import { Carousel } from "~/components";

interface AdvantageCardProps extends IHomeUtility {}


const options = {
    loop: false,
    items: 4,
}

const AdvantageCard = (props: AdvantageCardProps): ReactElement => {

    return (<Flex direction="column" gap="20px" alignItems="center" p="20px">
        <Image width="100px" src={props.avatarUrl} />
        <Heading size="sm" fontWeight="extrabold">{props.title}</Heading>
        <Text>{props.text}</Text>
    </Flex>);
}

export const Advantages = (): ReactElement => {

    return (<Flex direction="column" maxW="1200px" m="100px auto" gap="30px" alignItems="center" textAlign="center">
        <Heading maxW="30ch">Fenerbahce Token taraftarlara hangi avantajlari saglayacak?</Heading>
        {/* <Carousel options={options}>
            {homeutility.map((item, index) => {
                return (<AdvantageCard
                    key={index}
                    avatarUrl={item.avatarUrl}
                    title={item.title}
                    text={item.text}
                />)
            })}
        </Carousel> */}
    </Flex>);
};