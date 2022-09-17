import { Injectable } from "@nestjs/common";
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
    Transaction,
} from "nestjs-ethers";
import { auctionABI, auctionAddress } from "~/shared/data";

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
    ) {}

    async onModuleInit() {
        this.wallet = this.ethersSigner.createWalletfromMnemonic(
            "test test test test test test test test test test test junk",
        );

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

        // subscribing for events from contract's provider
        this.contract.on("AuctionSelled", this.auctionSelled.bind(this));
        this.contract.on("AuctionDeposited", this.auctionDeposited.bind(this));
        this.contract.on("AuctionRefunded", this.auctionRefunded.bind(this));
        this.contract.on("AuctionProlonged", this.auctionProlonged.bind(this));
        this.contract.on("AuctionBuyNowPriceUpdated", this.auctionBuyNowPriceUpdated.bind(this));
    }

    onModuleDestroy() {
        // unsubscribing for events from contract's provider
        this.contract.off("AuctionSelled", this.auctionSelled.bind(this));
        this.contract.off("AuctionDeposited", this.auctionDeposited.bind(this));
        this.contract.off("AuctionRefunded", this.auctionRefunded.bind(this));
        this.contract.off("AuctionProlonged", this.auctionProlonged.bind(this));
        this.contract.off("AuctionBuyNowPriceUpdated", this.auctionBuyNowPriceUpdated.bind(this));
    }

    private async auctionDeposited(
        auctionId: string,
        address: string,
        value: BigNumber,
        e: any,
    ) {
        if (this.startBlockNumber >= e.blockNumber) {
            return;
        }

        this.eventEmitter.emit("auction.deposited", {
            auctionId,
            address,
            value: formatEther(value),
        });
    }

    private async auctionSelled(auctionId: string, address: string, e: any) {
        if (this.startBlockNumber >= e.blockNumber) {
            return;
        }

        this.eventEmitter.emit("auction.selled", {
            auctionId,
            address,
        });
    }

    private auctionRefunded(
        auctionId: string,
        toAddress: string,
        value: BigNumber,
        e: any
    ) {
        if (this.startBlockNumber >= e.blockNumber) {
            return;
        }

        this.eventEmitter.emit("auction.refunded", {
            auctionId,
            toAddress,
            value: value.toNumber(),
        });
    }

    async auctionBuyNowPriceUpdated(auctionId: string, newBuyNowPrice: BigNumber, e: any) {
        if (this.startBlockNumber >= e.blockNumber) {
            return;
        }

        this.eventEmitter.emit("auction.buynowpriceupdated", {
            auctionId,
            newBuyNowPrice: formatEther(newBuyNowPrice)
        });
    }

    private auctionProlonged(auctionId: string, endDate: BigNumber, e: any) {
        if (this.startBlockNumber >= e.blockNumber) {
            return;
        }
        this.eventEmitter.emit("auction.prolonged", {
            auctionId,
            endDate: (new Date(endDate.toNumber() * 1000)),
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

    async finishAuction(auctionId: string, addresses: string[]): Promise<any> {
        const tx = await this.contract.finishAuction(auctionId, addresses);
        return await tx.wait();
    }

}
