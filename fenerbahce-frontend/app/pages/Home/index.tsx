import { Box } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { Footer, Header, FAQ, JoinCommunity } from "~/components";
import { Hero, TokenDefinition, Advantages, Utility, MobileApplication, ProjectCalendar } from "./components";

export const Home = (): ReactElement => {

    return (<Box minH="100vh">
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
    </Box>);
};
