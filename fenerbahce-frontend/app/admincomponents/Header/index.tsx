import { Flex, useMediaQuery } from "@chakra-ui/react";
import { ReactElement, useState, useEffect } from "react";
import { connectWalletEventBus } from "~/eventbus";
import { DesktopHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";

export const Header = (): ReactElement => {
	const [max991] = useMediaQuery("(max-width: 991px)");

	const [isAccountModelOpen, setIsAccountModelOpen] = useState<boolean>(false);

	connectWalletEventBus.useListener(
		"connectwallet.accountmodalchange",
		(status: boolean) => {
			setIsAccountModelOpen(status);
		},
		[],
	);

	useEffect(() => {
		if (isAccountModelOpen) {
			connectWalletEventBus.publish("connectwallet.toggleaccountmodal");
		}
	}, [max991]);

	return (
		<Flex justifyContent="space-between" p="25px 3%">
			{!max991 && <DesktopHeader />}
			{max991 && <MobileHeader />}
		</Flex>
	);
};
