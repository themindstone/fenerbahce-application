import { useClientInstance } from "~/utils";

interface BalanceFunctions {
	getBalanceByAuctionId: (auctionId: string, address: string) => Promise<any>;
}

interface GetAuctionsByPageParams {
	page: number;
	auctionByPage: number;
}

interface AuctionFunctions {
	getHighestBalancesByAuctionId: (auctionId: string) => Promise<any>;
	getAuctionsByPage: ({ page, auctionByPage }: GetAuctionsByPageParams) => Promise<any>;
}

export const useAuctionClient = (): AuctionFunctions => {
	const ClientInstance = useClientInstance();

	const getHighestBalancesByAuctionId = async (auctionId: string) => {
		return await ClientInstance.get(`auction/${auctionId}/highest-offers`);
	};

	const getAuctionsByPage = async ({ page, auctionByPage }: GetAuctionsByPageParams) => {
        return await ClientInstance.get("auction/byPage", {
            params: { page, auctionByPage }
        });
    };

	return {
		getHighestBalancesByAuctionId,
		getAuctionsByPage,
	};
};

export const useBalanceClient = (): BalanceFunctions => {
	const ClientInstance = useClientInstance();

	const getBalanceByAuctionId = async (auctionId: string, address: string) => {
		return await ClientInstance.get(`auction/${auctionId}/address/${address}/balance`);
	};

	return {
		getBalanceByAuctionId,
	};
};
