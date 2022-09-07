import { useContract } from "~/context";

export const AuctionContract = () => {
    const auctionContract = useContract("Auction");

    const deposit = async (...params: any) => {
        if (!auctionContract) {
            throw new Error("First, you need to connect contract");
        }
        const tx = await auctionContract.deposit(...params);
        return await tx.wait();
    };

    return { deposit };
}

