import { useClientInstance } from "~/utils";


interface BalanceFunctions {
    getBalanceByAuctionId: (auctionId: string, address: string) => Promise<any>;
}

interface AuctionFunctions {
    getHighestBalancesByAuctionId: (auctionId: string) => Promise<any>;
}

const useAuctionClient = (): AuctionFunctions => {
    const ClientInstance = useClientInstance();

    const getHighestBalancesByAuctionId = async (auctionId: string) => {
        return await ClientInstance.get(`auction/${auctionId}/highest-offers`);
    }

    return {
        getHighestBalancesByAuctionId
    };
}

const useBalanceClient = (): BalanceFunctions => {
    const ClientInstance = useClientInstance();

    const getBalanceByAuctionId = async (auctionId: string, address: string) => {
        return await ClientInstance.get(`auction/${auctionId}/address/${address}/balance`);
    };

    return {
        getBalanceByAuctionId,
    };
};


export {
    useBalanceClient,
    useAuctionClient,
};
