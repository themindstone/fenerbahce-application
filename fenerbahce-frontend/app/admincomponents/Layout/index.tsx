import { Box } from "@chakra-ui/react";
import React from "react";
import { Header } from "~/admincomponents";
import { ConnectWalletProvider, ContractsProvider } from "~/context";

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	return (
		<ConnectWalletProvider>
			<ContractsProvider>
				<Box boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)">
					<Header />
				</Box>
				<Box width="100vw" height="100vh" maxW="1000px" margin="auto" gridTemplateRows="110px auto">
					<Box p="20px" overflowY="auto">
						{children}
					</Box>
				</Box>
			</ContractsProvider>
		</ConnectWalletProvider>
	);
};
