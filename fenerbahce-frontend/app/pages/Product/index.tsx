import { Fragment } from "react";
import type { ReactElement } from "react";
import { ConnectWallet, Header, SideNav, Footer } from "~/components";
import { ProductWrapper } from "./components";

export const Product = (): ReactElement => {
	return (
		<Fragment>
			<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
			<ConnectWallet />
			<Header />
			<SideNav />
			<ProductWrapper />
			<Footer />
		</Fragment>
	);
};
