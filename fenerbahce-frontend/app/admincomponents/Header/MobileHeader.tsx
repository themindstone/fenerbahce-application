import type { ReactElement } from "react";
import { Flex, Image, Box, Link } from "@chakra-ui/react";
import { GoldenFizzIconButton, ShowAccount } from "~/components";
import { MenuIcon, UserIcon } from "~/assets";
import { FBTokenText } from "./utils";
import { useConnectWalletModal, useWalletModal } from "~/hooks";
import { useConnectWallet } from "~/context";
import { sideNavEventBus } from "~/eventbus";

export const MobileHeader = (): ReactElement => {
	const { connectWalletModalOpen } = useConnectWalletModal();
	const { isWalletModalOpen, showWalletModal } = useWalletModal();
	const connectWallet = useConnectWallet();

	const openSideNav = () => {
		sideNavEventBus.publish("sidenav.open");
	};

	return (
		<Flex display={{ base: "flex", lg: "none" }} w="100%" alignItems="center" justifyContent="space-between">
			<Link href="/">
				<Image src="/images/token-logo.png" w="60px" />
			</Link>
			<Flex gap="15px" alignItems="center" flexWrap="wrap-reverse">
				<FBTokenText />
				<MenuIcon onClick={openSideNav} cursor="pointer" />
				<Box pos="relative">
					{connectWallet.connectionState === "disconnected" && (
						<GoldenFizzIconButton
							icon={<UserIcon />}
							aria-label="user"
							onClick={connectWalletModalOpen}
							_active={{
								pointerEvents: isWalletModalOpen ? "none" : "all",
							}}
						/>
					)}

					{connectWallet.connectionState === "connected" && (
						<GoldenFizzIconButton
							icon={<UserIcon />}
							aria-label="user"
							onClick={showWalletModal}
							_active={{
								pointerEvents: isWalletModalOpen ? "none" : "all",
							}}
						/>
					)}
					<Box pos="absolute" p="10px 0px" zIndex="2" right="0" w="300px">
						<ShowAccount />
					</Box>
				</Box>
			</Flex>
		</Flex>
	);
};
