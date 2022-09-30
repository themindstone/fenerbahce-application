import { APIClientInstance } from "~/utils";

const getHighestBalancesByAuctionId = async (auctionId: string) => {
    const res = await APIClientInstance.get(`auction/${auctionId}/highest-offers`);
    return res.data;
}


export {
    getHighestBalancesByAuctionId
};

