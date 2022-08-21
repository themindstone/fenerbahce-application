import { Flex, Heading, Image } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { GoldenFizzButton } from "~/components/Button";

export const Hero = (): ReactElement => {


    return (<Flex gap="20px"
            p="100px 10%"
            direction={{ base: "column-reverse", md: "row" }}
            justifyContent="space-between"
            alignItems="center">
        <Flex direction="column" gap="30px" alignItems="flex-start">
            <Heading fontSize={{ base: "calc(2vw + 15px)", md: "clamp(30px, 4vw, 48px)" }} lineHeight="1.4">
                Fenerbahce Token, <br />
                #MazimFenerbahce <br />
                YarinimFenerbahce <br />
                diyenler icin Paribu'da
            </Heading>
            <GoldenFizzButton>Hemen Satin Al</GoldenFizzButton>
        </Flex>
		<Image src="/images/token-logo.png" w={{ base: "250px", md: "30vw"}} h={{ base: "250px", md: "30vw"}} />
    </Flex>);
};

