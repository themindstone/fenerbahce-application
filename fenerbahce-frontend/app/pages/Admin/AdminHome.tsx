import { ReactElement } from "react";
import { Layout } from "~/admincomponents";
import { GoldenFizzButton } from "~/components";
import { fbTokenAddress } from "~/data";

// we need to list products in this page
export const AdminHome = (): ReactElement => {

	const addTokenToMetamask = () => {
		if (!window.ethereum) {
			return;
		}
		const ethereum = window.ethereum as any;
		ethereum.request({
			method: "wallet_watchAsset",
			params: {
				type: "ERC20",
				options: {
					address: fbTokenAddress[config.NODE_ENV],
					symbol: "FB",
					decimals: 18
				}
			}
		})
	};

	return <Layout authenticationRequired={true}>
		<GoldenFizzButton onClick={addTokenToMetamask}>Tokeni metamask'a ekle</GoldenFizzButton>
	</Layout>
};
