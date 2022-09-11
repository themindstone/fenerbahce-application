import { useUserClientInstance } from "~/utils";


interface UserClientFunctions {
    getBalanceByAuctionId: (auctionId: string, address: string) => Promise<any>;
}

export const useUserClient = (): UserClientFunctions => {
    const UserClientInstance = useUserClientInstance();

    const getBalanceByAuctionId = async (auctionId: string, address: string) => {
        return await UserClientInstance.get(`auction/${auctionId}/address/${address}/balance`);
    };

    return { getBalanceByAuctionId };
};
