import type { ReactElement } from "react";
import { Fragment } from "react";
import { useConnectWallet } from "~/context";
import { Flex, Image, Text, Box, Link } from "@chakra-ui/react";
import { NavLink, FBTokenText } from "./utils";
import { GoldenFizzButton, ShowAccount } from "~/components";
import { UserIcon } from "~/assets";
import { useConnectWalletModal, useWalletModal } from "~/hooks";

export const DesktopHeader = (): ReactElement => {
	const connectWallet = useConnectWallet();
	const { connectWalletModalOpen } = useConnectWalletModal();
	const { isWalletModalOpen, showWalletModal } = useWalletModal();

	return (
		<Fragment>
			<Flex gap="40px" alignItems="center" display={{ base: "none", lg: "flex" }}>
				<Link href="/" _hover={{ textDecoration: "none" }}>
					<Flex gap="10px" alignItems="center">
						<Image src="/images/token-logo.png" w="60px" />
						<Text fontWeight="bold">
							FENERBAHÇE <br /> TOKEN
						</Text>
					</Flex>
				</Link>
				<FBTokenText />
			</Flex>
			<Flex gap="30px" alignItems="center" display={{ base: "none", lg: "flex" }}>
				<NavLink>KULLANIM ŞARTLARI</NavLink>
				<NavLink>S.S.S</NavLink>

				{connectWallet.connectionState === "disconnected" && (
					<GoldenFizzButton onClick={connectWalletModalOpen} leftIcon={<UserIcon />}>
						Giris yap
					</GoldenFizzButton>
				)}
				{connectWallet.connectionState === "connected" && (
					<Box pos="relative">
						<GoldenFizzButton
							onClick={showWalletModal}
							_active={{
								pointerEvents: isWalletModalOpen ? "none" : "all",
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
