import type { ReactElement } from "react";
import { useState, Fragment } from "react";
import { connectWalletEventBus } from "~/eventbus";
import { useConnectWallet } from "~/context";
import { Flex, Image, Text, Box } from "@chakra-ui/react";
import { NavLink, FBTokenText } from "./utils";
import { GoldenFizzButton, ShowAccount } from "~/components";
import { UserIcon } from "~/assets";

export const DesktopHeader = (): ReactElement => {

	const [isAccountModelOpen, setIsAccountModelOpen] = useState<boolean>(false);

	const connectWallet = useConnectWallet();
	
	const connectWalletModalOpen = () => {
		connectWalletEventBus.publish("connectwallet.open");
	};

	const showWalletAccount = () => {
		connectWalletEventBus.publish("connectwallet.toggleaccountmodal");
	};

	connectWalletEventBus.useListener(
		"connectwallet.accountmodalchange",
		(status: boolean) => {
			setIsAccountModelOpen(status);
		},
		[],
	);


	return (
		<Fragment>
			<Flex gap="40px" alignItems="center" display={{ base: "none", lg: "flex" }}>
				<Flex gap="10px" alignItems="center">
					<Image src="/images/token-logo.png" w="60px" />
					<Text fontWeight="bold">
						FENERBAHÇE <br /> TOKEN
					</Text>
				</Flex>
				<FBTokenText />
			</Flex>
			<Flex gap="30px" alignItems="center" display={{ base: "none", lg: "flex" }}>
				<NavLink>HAKKINDA</NavLink>
				<NavLink>FAYDALAR</NavLink>
				<NavLink>ŞARTLAR</NavLink>
				<NavLink>S.S.S</NavLink>
				<NavLink>EN</NavLink>

				{connectWallet.connectionState === "disconnected" && (
					<GoldenFizzButton onClick={connectWalletModalOpen} leftIcon={<UserIcon />}>
						Giris yap
					</GoldenFizzButton>
				)}
				{connectWallet.connectionState === "connected" && (
					<Box pos="relative">
						<GoldenFizzButton
							onClick={showWalletAccount}
							_active={{
								pointerEvents: isAccountModelOpen ? "none" : "all",
							}}
							leftIcon={<UserIcon />}>
							{connectWallet.shortAddress}
						</GoldenFizzButton>
						<Box pos="absolute" p="10px 0px" zIndex="2" right="0" w="300px">
							<ShowAccount />
						</Box>
					</Box>
				)}
			</Flex>
		</Fragment>
	);
};
