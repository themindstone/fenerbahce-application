import { Box } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { Header } from "~/admincomponents";
import { ConnectWalletProvider, ContractsProvider, AuthProvider } from "~/context";

interface LayoutProps {
	children: React.ReactNode;
	authenticationRequired: boolean;
}

export const Layout = ({ children, authenticationRequired = true }: LayoutProps) => {
	const Page = () => (
		<Fragment>
			<Box boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)">
				<Header />
			</Box>
			<Box width="100vw" height="100vh" maxW="1000px" margin="auto" gridTemplateRows="110px auto">
				<Box p="20px" overflowY="auto">
					{children}
				</Box>
			</Box>
		</Fragment>
	);

	return (
		<AuthProvider authenticationRequired={authenticationRequired}>
			<ConnectWalletProvider>
				<ContractsProvider>
					<Page />
				</ContractsProvider>
			</ConnectWalletProvider>
		</AuthProvider>
	);
};
