import { Box } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { Footer, Header } from "~/components";
import { Hero, TokenDefinition, Advantages, Utility, MobileApplication, ProjectCalendar, FAQ, JoinCommunity } from "./components";

export const Home = (): ReactElement => {

    return (<Box minH="100vh">
        {/* <link rel="stylesheet" href="owl-carousel/owl.theme.css"></link> */}
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
        <Header />
        <Hero />
        <TokenDefinition />
        <Advantages />
        <Utility />
        <MobileApplication />
        <ProjectCalendar />
        <FAQ />
        <JoinCommunity />
        <Footer />
        {/* <link rel="stylesheet" href="owl-carousel/owl.theme.css" /> */}
    </Box>);
};