// root.tsx
import React, { useContext, useEffect } from "react";
import { withEmotionCache } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { MetaFunction, LinksFunction, json } from "@remix-run/node";
import { theme } from "./theme";
import styles from "./styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { TokenLogoImage } from "~/assets";

import { ServerStyleContext, ClientStyleContext } from "./_context";
import { LoadingModal } from "./components/LoadingModal";
import { Config, config } from "~/configs";
import { ModalMediator } from "./mediators";

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "$FB - Fenerbahçe Token",
	viewport: "width=device-width,initial-scale=1",
});

export let links: LinksFunction = () => {
	return [
		{ rel: "preconnect", href: "https://fonts.googleapis.com" },
		{ rel: "preconnect", href: "https://fonts.gstatic.com" },
		{
			rel: "stylesheet",
			href: "https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap",
		},
		{ rel: "stylesheet", href: styles },
		{ rel: "icon", type: "image/x-icon", href: TokenLogoImage },
	];
};

interface DocumentProps {
	children: React.ReactNode;
}

const Document = withEmotionCache(({ children }: DocumentProps, emotionCache) => {
	const serverStyleData = useContext(ServerStyleContext);
	const clientStyleData = useContext(ClientStyleContext);
	const { config } = useLoaderData();

	// Only executed on client
	useEffect(() => {
		// re-link sheet container
		emotionCache.sheet.container = document.head;
		// re-inject tags
		const tags = emotionCache.sheet.tags;
		emotionCache.sheet.flush();
		tags.forEach(tag => {
			(emotionCache.sheet as any)._insertTag(tag);
		});
		// reset cache to reapply global styles
		clientStyleData?.reset();
	}, []);

	// console.log(JSON.stringify(config))

	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
				{serverStyleData?.map(({ key, ids, css }) => (
					<style
						key={key}
						data-emotion={`${key} ${ids.join(" ")}`}
						dangerouslySetInnerHTML={{ __html: css }}
					/>
				))}
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.config = ${JSON.stringify(config)}`,
					}}></script>
				<LiveReload />
			</body>
		</html>
	);
});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
		},
	},
});

type LoaderData = {
	config: Config;
};

export const loader = () => {
	return json<LoaderData>({
		config: config,
	});
};

export default function App() {
	return (
		<Document>
			<QueryClientProvider client={queryClient}>
				<ChakraProvider theme={theme}>
					<Outlet />
					<LoadingModal />
					<ModalMediator></ModalMediator>
				</ChakraProvider>
			</QueryClientProvider>
		</Document>
	);
}
