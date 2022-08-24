import React, { useEffect, useLayoutEffect, useState } from "react";
import type { ReactElement } from "react";
import { IWallet } from "~/interfaces";
import { wallets } from "~/wallets";

interface ConnectWalletContextInterface {
    initialize: (name: keyof typeof wallets) => void;
    connect: () => void;
    disconnect: () => void;
    name: string;
    address: string;
    shortAddress: string;
    isConnected: boolean;
    connectionState: IWallet["connectionState"];
}

interface ConnectWalletProviderInterface {
    children: React.ReactNode;
}

const ConnectWalletContext = React.createContext<ConnectWalletContextInterface>({
    initialize: (name: keyof typeof wallets) => {},
    connect: () => {},
    disconnect: () => {},
    name: "",
    address: "",
    shortAddress: "",
    isConnected: false,
    connectionState: "idle",
});

export const ConnectWalletProvider = ({
    children
}: ConnectWalletProviderInterface): ReactElement => {

    // fetch last default wallet from local storage
    const [defaultWallet, setDefaultWallet] = useState<IWallet>(() => wallets.MetamaskWallet);

    useEffect(() => {
        // check every wallet and show connected ones
        async function handler() {
            const wallet = wallets[localStorage.defaultWallet as keyof typeof wallets || "MetamaskWallet"];
            await wallet.initialize();
            const newWallet = wallet.getWallet();


            setDefaultWallet(newWallet);
        }
        if (!defaultWallet.isConnected) {
            handler();
        }
    }, []);

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
            console.log("error")
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
    };

    return (<ConnectWalletContext.Provider value={value}>
        {children}
    </ConnectWalletContext.Provider>);
};

export const useConnectWallet = () => React.useContext(ConnectWalletContext);