import { Box } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { Footer, Header } from "~/components";
import { Hero, TokenDefinition, Advantages } from "./components";

export const Home = (): ReactElement => {

    return (<Box bgImage="url(/images/wave-big.png)" minH="100vh" bgPos="top right" bgSize="cover">
        <Header />
        <Hero />
        <TokenDefinition />
        <Advantages />
        <Footer />
        <link rel="stylesheet" href="owl-carousel/owl.theme.css"></link>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
        {/* <link rel="stylesheet" href="owl-carousel/owl.theme.css" /> */}
    </Box>);
};