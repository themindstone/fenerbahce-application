import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventEmitter2 } from "@nestjs/event-emitter";
import {
    InjectContractProvider,
    InjectSignerProvider,
    EthersContract,
    EthersSigner,
    Wallet,
    Contract,
    BigNumber,
    InjectEthersProvider,
    Provider,
    parseUnits,
    formatEther,
} from "nestjs-ethers";
import { auctionABI } from "~/shared/data";
import { MoralisAPIService } from "~/shared/libs";

interface AuctionContractCreateAuctionDto {
    auctionId: string;
    startDate: string;
    endDate: string;
    bidIncrement: number;
    startPrice: number;
    buyNowPrice: number;
}

@Injectable()
export class AuctionContract {
    private wallet: Wallet;
    private contract: Contract;
    private startBlockNumber: number;

    constructor(
        private eventEmitter: EventEmitter2,
        @InjectContractProvider()
        private readonly ethersContract: EthersContract,
        @InjectSignerProvider()
        private readonly ethersSigner: EthersSigner,
        @InjectEthersProvider()
        private readonly provider: Provider,
        private readonly configService: ConfigService,
        private readonly moralisApiService: MoralisAPIService,
    ) {}

    async onModuleInit() {
        const auctionAddress = this.configService.get(
            "AUCTION_CONTRACT_ADDRESS",
        );
        const wallet = this.configService.get<string>("WALLET");
        if (!auctionAddress) {
            throw new Error("You need to provide auction contract address");
        }
        if (!wallet) {
            throw new Error("Wallet does not exist");
        }

        this.moralisApiService.LiveQuery("AuctionDeposited", (object) =>
            this.auctionDeposited(object.attributes),
        );
        this.moralisApiService.LiveQuery("AuctionSelled", (object) =>
            this.auctionSelled(object.attributes),
        );
        this.moralisApiService.LiveQuery("AuctionRefunded", (object) =>
            this.auctionRefunded(object.attributes),
        );
        this.moralisApiService.LiveQuery("AuctionProlonged", (object) =>
            this.auctionProlonged(object.attributes),
        );
        this.moralisApiService.LiveQuery(
            "AuctionBuyNowPriceUpdated",
            (object) => this.auctionBuyNowPriceUpdated(object.attributes),
        );

        this.wallet = this.ethersSigner.createWalletfromMnemonic(wallet);

        try {
            this.contract = this.ethersContract.create(
                auctionAddress,
                auctionABI,
                this.wallet,
            );
        } catch {
            throw new Error("Error connecting to the contract");
        }
        this.startBlockNumber = await this.provider.getBlockNumber();
    }

    private async auctionDeposited({
        auctionId,
        address,
        value,
        block_number,
    }: any) {
        if (this.startBlockNumber >= block_number) {
            return;
        }

        this.eventEmitter.emit("auction.deposited", {
            auctionId,
            address,
            value: formatEther(value),
        });
    }

    private async auctionSelled({ auctionId, buyer, block_number }: any) {
        if (this.startBlockNumber >= block_number) {
            return;
        }

        this.eventEmitter.emit("auction.selled", {
            auctionId,
            buyer,
        });
    }

    private auctionRefunded({ auctionId, to, value, block_number }: any) {
        if (this.startBlockNumber >= block_number) {
            return;
        }

        this.eventEmitter.emit("auction.refunded", {
            auctionId,
            to,
            value: formatEther(value),
        });
    }

    async auctionBuyNowPriceUpdated({
        auctionId,
        newBuyNowPrice,
        block_number,
    }: any) {
        if (this.startBlockNumber >= block_number) {
            return;
        }

        this.eventEmitter.emit("auction.buynowpriceupdated", {
            auctionId,
            newBuyNowPrice: formatEther(newBuyNowPrice),
        });
    }

    private auctionProlonged({ auctionId, endDate, block_number }: any) {
        if (this.startBlockNumber >= block_number) {
            return;
        }
        this.eventEmitter.emit("auction.prolonged", {
            auctionId,
            endDate: new Date(endDate.toNumber() * 1000),
        });
    }

    async createAuction({
        auctionId,
        startDate,
        endDate,
        bidIncrement = 100,
        startPrice,
        buyNowPrice,
    }: AuctionContractCreateAuctionDto) {
        const tx = await this.contract.createAuction(
            auctionId,
            BigNumber.from(Math.floor(new Date(startDate).getTime() / 1000)),
            BigNumber.from(Math.floor(new Date(endDate).getTime() / 1000)),
            parseUnits(bidIncrement.toString(), "18"),
            parseUnits(startPrice.toString(), "18"),
            parseUnits(buyNowPrice.toString(), "18"),
        );
        return await tx.wait();
    }

    async refundTokensToUsers(auctionId: string, losers: string[]) {
        return await Promise.all(
            losers.map(async (loser) => {
                const tx = await this.contract.refund(auctionId, loser);
                await tx.wait();
            }),
        );
    }
}
