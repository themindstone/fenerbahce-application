import { ethers } from "ethers";
import { useCallback } from "react";
import { useContract } from "~/context";

interface AuctionContractDepositDTO {
    auctionId: string;
    value: number;
}

interface AuctionContractBuyNowDTO {
    auctionId: string;
    buyNowPrice: number;
}

interface AuctionContractFunctions {
    deposit: (args: AuctionContractDepositDTO) => Promise<any>;
    buyNow: (args: AuctionContractBuyNowDTO) => Promise<any>;
}

export const useAuctionContract = (): AuctionContractFunctions => {
    const { contract } = useContract("Auction");

    const deposit = useCallback(async ({
        auctionId,
        value
    }: AuctionContractDepositDTO) => {

        if (!contract) {
            throw new Error("First, you need to connect contract");
        }
        const tx = await contract.depositToAuction(auctionId, {
            value: ethers.utils.parseUnits(value.toString(), "wei")
        });
        return await tx.wait();
    }, [contract]);


    const buyNow = useCallback(async ({
        auctionId,
        buyNowPrice
    }: AuctionContractBuyNowDTO) => {

        if (!contract) {
            throw new Error("First, you need to connect contract");
        }

        const tx = await contract.buyNow(auctionId, {
            value: ethers.utils.parseUnits(buyNowPrice.toString(), "wei")
        });

        return await tx.wait();
    }, [contract]);


    return { deposit, buyNow };
};

