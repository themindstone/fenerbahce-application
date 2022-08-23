declare global {
	interface Window {
		$: any;
		ethereum: import('ethers').providers.ExternalProvider;
	}
}

export {};
