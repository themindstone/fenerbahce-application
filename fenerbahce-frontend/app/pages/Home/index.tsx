import { Box } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { Footer, Header } from "~/components";
import { Hero, TokenDefinition, Utility } from "./components";

export const Home = (): ReactElement => {

    return (<Box bgImage="url(/images/wave-big.png)" minH="100vh" bgPos="top right" bgSize="cover">
        <Header />
        <Hero />
        <TokenDefinition />
        <Utility />
        <Footer />
    </Box>);
};