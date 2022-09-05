import { Fragment } from "react";
import type { ReactElement } from "react";
import { ConnectWallet, Header, SideNav, Footer } from "~/components";
import { Grid, useMediaQuery, VStack } from "@chakra-ui/react";
import { Gallery, ProductInfo } from "./components";

export const Product = (): ReactElement => {
	const [md] = useMediaQuery("(max-width: 900px)");

	return (
		<Fragment>
			<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
			<ConnectWallet />
			<Header />
			<SideNav />
			{md && <VStack pb="100px">
				<Gallery />
				<ProductInfo />
			</VStack>}


			{md === false && <Grid gap="100px" maxW="1200px" margin="3% auto" p="20px" gridTemplateColumns="6fr 7fr">
				<Gallery />
				<ProductInfo />
			</Grid>}
			<Footer />
		</Fragment>
	);
};
