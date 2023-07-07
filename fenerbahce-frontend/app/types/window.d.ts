import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
	interface Window {
		$: any;
		ethereum: MetaMaskInpageProvider;
	}
}

export {};
