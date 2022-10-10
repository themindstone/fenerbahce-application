import { ReactElement } from "react";
import { BuyNowModal, FAQ, Footer, Header, JoinCommunity, PlaceBidModal, SideNav } from "~/components";
import { ActiveAuctions, FinishedAuctions, Hero, MobileApplication } from "./components";
import { ConnectWallet } from "~/components/ConnectWallet";
import { ConnectWalletProvider, ContractsProvider } from "~/context";
import { ModalMediator } from "~/mediators";

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
				<FinishedAuctions />
				<MobileApplication />
				<FAQ />
				<JoinCommunity />
				<Footer />
				<PlaceBidModal></PlaceBidModal>
				<BuyNowModal />
			</ContractsProvider>
		</ConnectWalletProvider>
	);
};
