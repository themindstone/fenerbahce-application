import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    styles: {
        global: {
            body: {
                bgImage: "url(/images/wave-big.png)",
                bgRepeat: "no-repeat",
                bgPos: "top right"
            }
        }
    }
});
