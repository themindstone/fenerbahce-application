import { Grid } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { Gallery } from "./Gallery";
import { ProductInfo } from "./ProductInfo";

export const ProductWrapper = (): ReactElement => {

    return <Grid gap="100px" maxW="1200px" margin="3% auto" p="20px" gridTemplateColumns="6fr 7fr">
        <Gallery />
        <ProductInfo />
    </Grid>
};
