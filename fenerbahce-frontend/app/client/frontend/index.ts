import { APIClientInstance, ParibuAPIClient } from "~/utils";

interface BalanceFunctions {
	getBalanceByAuctionId: (auctionId: string, address: string) => Promise<any>;
}

interface GetAuctionsByPageParams {
	page: number;
	auctionByPage: number;
}

interface FinishAuctionParams {
	username: string;
	password: string;
	auctionId: string;
}

interface ListFinishedAuctionParams {
	page: number;
}

interface AuctionFunctions {
	getHighestBalancesByAuctionId: (auctionId: string) => Promise<any>;
	getAuctionsByPage: ({ page, auctionByPage }: GetAuctionsByPageParams) => Promise<any>;
	finishAuction: (params: FinishAuctionParams) => Promise<any>;
	listFinishedAuctions: (params: ListFinishedAuctionParams) => Promise<any>;
	// getHighestBalanceByAuctionId: (params: { auctionId: string }) => Promise<any>;
}

export const useAuctionClient = (): AuctionFunctions => {
	const getHighestBalancesByAuctionId = async (auctionId: string) => {
		if (!auctionId) {
			return;
		}
		return await APIClientInstance.get(`auction/${auctionId}/highest-offers`);
	};

	const getAuctionsByPage = async ({ page, auctionByPage }: GetAuctionsByPageParams) => {
		return await APIClientInstance.get("auction/byPage", {
			params: { page, auctionByPage },
		});
	};

	const finishAuction = async ({ auctionId, username, password }: FinishAuctionParams) => {
		return await APIClientInstance.post(`auction/finish`, { auctionId, username, password });
	};

	const listFinishedAuctions = async (params: ListFinishedAuctionParams) => {
		return await APIClientInstance.get("auction/list-finished-auctions", { params });
	};

	// const getHighestBalanceByAuctionId = async (params: { auctionId: string }) => {
	// 	return await APIClientInstance.get(`auction/${params.auctionId}/highest-offer`);
	// };

	return {
		getHighestBalancesByAuctionId,
		getAuctionsByPage,
		finishAuction,
		listFinishedAuctions,
		// getHighestBalanceByAuctionId,
	};
};

export const useBalanceClient = (): BalanceFunctions => {
	const getBalanceByAuctionId = async (auctionId: string, address: string) => {
		return await APIClientInstance.get(`auction/${auctionId}/address/${address}/balance`);
	};

	return {
		getBalanceByAuctionId,
	};
};

export const useParibuClient = () => {
	const getLatestFBTokenPrice = async () => {
		const res = await ParibuAPIClient.get("external/service/mohikan-app-wsb1kly5-1ktu6m5x-9da7b653/last-price");
		return res.data["data"]["fb-tl"]["last-price"];
	};

	return { getLatestFBTokenPrice };
};
