import { Box, Image } from "@chakra-ui/react";
import type { ReactElement } from "react";


export const MobileApplication = (): ReactElement => {

    return (<Box maxW="1500px" w="80%" margin="150px auto" borderRadius="20px" overflow="hidden">
        <Image src="/images/home-mobile-application.jpeg" />
    </Box>);
};