import { useState } from "react";
import { connectWalletEventBus } from "~/eventbus";

export const useWalletModal = () => {
	const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);

	const showWalletModal = () => {
		connectWalletEventBus.publish("connectwallet.toggleaccountmodal");
	};

	connectWalletEventBus.useListener(
		"connectwallet.accountmodalchange",
		(status: boolean) => {
			setIsWalletModalOpen(status);
		},
		[],
	);

	return {
		isWalletModalOpen,
		showWalletModal,
	};
};
