import { Flex, Heading, Text } from "@chakra-ui/react";
import type { ReactElement } from "react";
import OwlCarousel from "react-owl-carousel2";


const options = {
    items: 4,
    autoWidth: true,
    loop: true,
    margin: 30,
}

const UtilityCard = (): ReactElement => {


    return (<Flex w="280px" height="350px" 
        bgImage="url(https://img.fanatik.com.tr/img/78/740x418/62dcfaafae298b9e8e0cfeb0.jpg)"
        bgPos="center"
        bgSize="cover"
        borderRadius="10px"
        boxShadow="inset 0 0 150px #000000"
        pos="relative"
    >
        <Flex pos="absolute" gap="5px" top="240px" direction="column" p="20px">
            <Text fontWeight="bold" color="var(--golden-fizz)">Basketbol</Text>
            <Heading size="md">Locada Mac Keyfi</Heading>
        </Flex>
    </Flex>);
};

export const Utility = (): ReactElement => {


    return (<Flex direction="column" gap="50px" alignItems="center" className="utility-container">
        <Heading>Fenerbahce Token Faydalari</Heading>
        <OwlCarousel options={options}>
            <UtilityCard />
            <UtilityCard />
            <UtilityCard />
            <UtilityCard />
            <UtilityCard />
            <UtilityCard />
            <UtilityCard />
            <UtilityCard />
            <UtilityCard />
            <UtilityCard />
            <UtilityCard />
            <UtilityCard />
            <UtilityCard />
            <UtilityCard />
            <UtilityCard />
            <UtilityCard />
            <UtilityCard />
            <UtilityCard />
        </OwlCarousel>
    </Flex>)
};