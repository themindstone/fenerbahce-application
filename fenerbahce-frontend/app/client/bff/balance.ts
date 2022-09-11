import { BFFClient } from "~/utils";

const getHighestBalancesByAuctionId = async (auctionId: string) => {
    const res = await BFFClient.get(`auction/${auctionId}/highest-offers`);
    return res.data;
}


export default {
    getHighestBalancesByAuctionId
};

