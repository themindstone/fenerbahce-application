import { useState } from "react";
import { connectWalletEventBus } from "~/eventbus";

export const useConnectWalletModal = () => {

    const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] = useState<boolean>(false);

    const connectWalletModalOpen = () => {
		connectWalletEventBus.publish("connectwallet.open");
	};
    
    connectWalletEventBus.useListener("connectwallet.connectwalletmodalchange", (status: boolean) => {
        setIsConnectWalletModalOpen(status);
    }, []);

    return {
        isConnectWalletModalOpen,
        connectWalletModalOpen,
    };
};