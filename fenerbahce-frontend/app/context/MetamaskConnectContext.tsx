import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { wallets } from "~/wallets";
import { IWallet, ConnectWalletProviderInterface, ConnectWalletContextInterface } from "~/interfaces";
import { KYCProvider } from "./KYCContext";
import { useChainConfig } from "~/hooks";

const ConnectWalletContext = React.createContext<ConnectWalletContextInterface>({
	initialize: (name: keyof typeof wallets) => {},
	connect: () => {},
	disconnect: () => {},
	name: "",
	address: "",
	shortAddress: "",
	isConnected: false,
	connectionState: "idle",
	isCorrectNetwork: false,
});

export const useProviderListener = (event: string, listener: (...args: any[]) => void, deps: any[]) => {
	useEffect(() => {
		if (!window.ethereum) {
			return;
		}
		window.ethereum.on(event, listener);
		return () => {
			window.ethereum.removeListener(event, listener);
		};
	}, deps);
};

export const ConnectWalletProvider = ({ children }: ConnectWalletProviderInterface): ReactElement => {
	// fetch last default wallet from local storage
	const [defaultWallet, setDefaultWallet] = useState<IWallet>(() => wallets.MetamaskWallet);
	const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(false);

	const { checkIfIsCorrectNetwork } = useChainConfig();

	const connectWallet = async () => {
		if (!defaultWallet.isConnected) {
			const wallet = wallets[(localStorage.defaultWallet as keyof typeof wallets) || "MetamaskWallet"];
			await wallet.initialize();
			const newWallet = wallet.getWallet();

			setDefaultWallet(newWallet);
		}
	};

	const networkChanged = async () => {
		if (!window.ethereum) {
			return;
		}
		connectWallet();
		setIsCorrectNetwork(await checkIfIsCorrectNetwork());
	};

	useEffect(() => {
		// check every wallet and show connected ones
		networkChanged();
	}, []);

	useProviderListener("accountsChanged", connectWallet, []);
	useProviderListener("networkChanged", networkChanged, []);

	const initialize = async (name: keyof typeof wallets) => {
		await wallets[name].initialize();
		const newWallet = wallets[name].getWallet();

		localStorage.defaultWallet = name;
		setDefaultWallet(newWallet);
	};

	const connect = async () => {
		try {
			await defaultWallet.connect();
			const wallet = defaultWallet.getWallet();
			setDefaultWallet(wallet);
		} catch {
			console.log("error");
		}
	};

	const disconnect = () => {
		defaultWallet.disconnect();
	};

	const value: ConnectWalletContextInterface = {
		initialize,
		connect,
		disconnect,
		address: defaultWallet.address,
		name: defaultWallet.name,
		isConnected: defaultWallet.isConnected,
		connectionState: defaultWallet.connectionState,
		shortAddress: defaultWallet.shortAddress,
		isCorrectNetwork,
	};

	return (
		<ConnectWalletContext.Provider value={value}>
			<KYCProvider>{children}</KYCProvider>
		</ConnectWalletContext.Provider>
	);
};

export const useConnectWallet = () => React.useContext(ConnectWalletContext);
