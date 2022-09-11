import { ethers } from "ethers";
import { useCallback } from "react";
import { useContract } from "~/context";

interface AuctionContractDepositDTO {
    auctionId: string;
    value: string;
}

interface AuctionContractBuyNowDTO {
    auctionId: string;
    buyNowPrice: string;
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
            value: ethers.utils.parseUnits(value, "18")
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
            value: ethers.utils.parseUnits(buyNowPrice, "18")
        });

        return await tx.wait();
    }, [contract]);

    return {
        deposit,
        buyNow,
    };
};

