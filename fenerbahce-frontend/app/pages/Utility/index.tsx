import { ReactElement } from "react";
import { FAQ, Footer, Header, JoinCommunity, SideNav } from "~/components";
import { ActiveAuctions, Hero, HighestOffers, MobileApplication } from "./components";
import { ConnectWallet } from "~/components/ConnectWallet";
import { ConnectWalletProvider } from "~/context";

export const Utility = (): ReactElement => {

	return (
		<ConnectWalletProvider>
			<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
			<ConnectWallet />
			<Header />
			<SideNav />
			<Hero />
			<ActiveAuctions />
			<HighestOffers />
			<MobileApplication />
			<FAQ />
			<JoinCommunity />
			<Footer />
		</ConnectWalletProvider>
	);
};
