import { Flex, Heading, Image } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { GoldenFizzButton } from "~/components/Button";

export const Hero = (): ReactElement => {


    return (<Flex gap="20px" p="100px 10%" justifyContent="space-between" alignItems="center">
        <Flex direction="column" gap="30px" alignItems="flex-start">
            <Heading size="2xl" lineHeight="1.4">
                Fenerbahce Token, <br />
                #MazimFenerbahce <br />
                YarinimFenerbahce <br />
                diyenler icin Paribu'da
            </Heading>
            <GoldenFizzButton>Hemen Satin Al</GoldenFizzButton>
        </Flex>
        <Image src="/images/token-logo.png" w="500px" h="500px" />
    </Flex>);
};

