import { ReactElement } from "react";
import { FAQ, Footer, Header, JoinCommunity, PlaceBidModal, SideNav } from "~/components";
import { ActiveAuctions, Hero, HighestOffers, MobileApplication } from "./components";
import { ConnectWallet } from "~/components/ConnectWallet";
import { ConnectWalletProvider, ContractsProvider } from "~/context";

export const Utility = (): ReactElement => {
	return (
		<ConnectWalletProvider>
			<ContractsProvider>
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
				<PlaceBidModal></PlaceBidModal>
			</ContractsProvider>
		</ConnectWalletProvider>
	);
};
