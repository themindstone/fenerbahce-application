import { APIClientInstance } from "~/utils";

const getHighestBalancesByAuctionId = async (auctionId: string) => {
	if (!auctionId) {
		throw new Error("AuctionId undefined");
		// return;
	}
	const res = await APIClientInstance.get(`auction/${auctionId}/highest-offers`);
	return res.data;
};

export { getHighestBalancesByAuctionId };
