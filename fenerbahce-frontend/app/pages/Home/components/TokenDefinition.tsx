import type { ReactElement } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { WhiteButton } from "~/components/Button";


export const TokenDefinition = (): ReactElement => {

    return (<Flex maxW="65ch" w="90%" m="auto" gap="30px" direction="column" textAlign="center" alignItems="center">
        <Heading size="xl">Fenerbahce Token (FB) Nedir?</Heading>
        <Text lineHeight="1.7" color="#ffffff87">
            Fenerbahce Token, Fenerbahce Spor Kulübü'nün "utility token" olarak tanimlanan "taraftar token'i "dir.
            Fenerbahçe ve Paribu is birligiyle üretilen Fenerbahçe Token, Fenerbahçe taraftarlarina çesitli
            ayricaliklar sunacak. Fenerbahce taraftarlari token sahibi olarak hem kendi yarmnina hem de kulübünün
            yarinina dijital dünyanin olanaklaryla katki saglayabilecek.
        </Text>
        <Flex gap="20px">
            <WhiteButton>Whitepaper</WhiteButton>
            <WhiteButton>Faaliyet Raporu</WhiteButton>
        </Flex>
    </Flex>);
};