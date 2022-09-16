import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import { SideNav } from "~/admincomponents";
import { Header } from "~/components";
import { ContractsProvider } from "~/context";

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	return (
		<ContractsProvider>
			<Grid
				width="100vw"
				height="100vh"
				gridTemplateColumns="250px auto"
				gridTemplateRows="110px auto"
				overflowY="hidden">
				<Box gridRow="1/-1" boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)" overflowY="auto">
					<SideNav />
				</Box>
				<Box boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)">
					<Header />
				</Box>
				<Box p="20px" overflowY="auto">
					{children}
				</Box>
			</Grid>
		</ContractsProvider>
	);
};
