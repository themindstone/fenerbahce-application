import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { UserIcon } from "~/assets";
import { useConnectWallet } from "~/context";
import { connectWalletEventBus } from "~/eventbus";
import { GoldenFizzButton } from "../Button";
import { ShowAccount } from "~/components";

interface NavLinkProps {
	children?: React.ReactNode;
}

const NavLink = ({ children, ...rest }: NavLinkProps): ReactElement => {
	return (
		<Link {...rest} fontWeight="bold">
			{children}
		</Link>
	);
};

export const Header = (): ReactElement => {

	const connectWallet = useConnectWallet();

	const [isAccountModelOpen, setIsAccountModelOpen] = useState<boolean>(false);

	const connectWalletModalOpen = () => {
		connectWalletEventBus.publish("connectwallet.open");
	};

	const showWalletAccount = () => {
		connectWalletEventBus.publish("connectwallet.toggleaccountmodal");
	};

	connectWalletEventBus.useListener("connectwallet.accountmodalchange", (status: boolean) => {
		setIsAccountModelOpen(status);
	}, []);

	return (
		<Flex justifyContent="space-between" p="25px 3%">
			<Flex gap="40px" alignItems="center">
				<Flex gap="10px" alignItems="center">
					<Image src="/images/token-logo.png" w="60px" />
					<Text fontWeight="bold">
						FENERBAHÇE <br /> TOKEN
					</Text>
				</Flex>
				<Text
					bg="white"
					color="var(--biscay)"
					fontWeight="bold"
					p="5px 10px"
					borderRadius="5px"
					fontSize="16px">
					FB Token: 36.05₺
				</Text>
			</Flex>
			<Flex gap="30px" alignItems="center" display={{ base: "none", lg: "flex" }}>
				<NavLink>HAKKINDA</NavLink>
				<NavLink>FAYDALAR</NavLink>
				<NavLink>ŞARTLAR</NavLink>
				<NavLink>S.S.S</NavLink>
				<NavLink>EN</NavLink>
				
				{connectWallet.connectionState === "disconnected" &&
					<GoldenFizzButton onClick={connectWalletModalOpen} leftIcon={<UserIcon />}>Giris yap</GoldenFizzButton>
				}
				{connectWallet.connectionState === "connected" &&
				<Box pos="relative">
					<GoldenFizzButton onClick={showWalletAccount}
					// pointerEvents={isAccountModelOpen ? "fill" : "all"}
					_active={{
						pointerEvents: isAccountModelOpen ? "none" : "all"
					}}
						// pointerEvents={!isAccountModelOpen && "none" : "all"}
						leftIcon={<UserIcon />}>{connectWallet.shortAddress}</GoldenFizzButton>
					<Box pos="absolute" p="10px 0px" zIndex="2" right="0" w="300px">
						<ShowAccount />
					</Box>
				</Box>
				}
			</Flex>
		</Flex>
	);
};
