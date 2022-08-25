import type { ReactElement } from "react";
import { useState } from "react";
import { Flex, Image, Box } from "@chakra-ui/react";
import { GoldenFizzIconButton } from "~/components";
import { connectWalletEventBus } from "~/eventbus";
import { MenuIcon, UserIcon } from "~/assets";
import { FBTokenText } from "./utils";
import { ShowAccount } from "~/components";

export const MobileHeader = (): ReactElement => {
	const [isAccountModelOpen, setIsAccountModelOpen] = useState<boolean>(false);

	const showWalletAccount = () => {
		connectWalletEventBus.publish("connectwallet.toggleaccountmodal");
	};

	return (
		<Flex display={{ base: "flex", lg: "none" }} w="100%" alignItems="center" justifyContent="space-between">
			<Image src="/images/token-logo.png" w="60px" />
			<Flex gap="30px" alignItems="center">
				<FBTokenText />
				<MenuIcon />
				<Box pos="relative">
					<GoldenFizzIconButton
						icon={<UserIcon />}
						aria-label="user"
						onClick={showWalletAccount}
						_active={{
							pointerEvents: isAccountModelOpen ? "none" : "all",
						}}
					/>
					<Box pos="absolute" p="10px 0px" zIndex="2" right="0" w="300px">
						<ShowAccount />
					</Box>
				</Box>
			</Flex>
		</Flex>
	);
};
