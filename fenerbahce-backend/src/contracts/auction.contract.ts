import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectContractProvider, InjectSignerProvider, EthersContract, EthersSigner, Wallet, Contract, BigNumber, InjectEthersProvider, Provider, parseUnits, formatEther } from "nestjs-ethers";
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
        private readonly provider: Provider
    ) {}

    async onModuleInit() {
        this.wallet = this.ethersSigner.createWalletfromMnemonic(
            "test test test test test test test test test test test junk",
        );

        try {
            this.contract = this.ethersContract.create(
                auctionAddress,
                auctionABI,
                this.wallet
            );
        }
        catch {
            throw new Error("Error connecting to the contract");
        }
        this.startBlockNumber = await this.provider.getBlockNumber();

        // this.contract.on("AuctionCreated", this.auctionCreated.bind(this));
        this.contract.on("AuctionBought", this.auctionSelled.bind(this));
        this.contract.on("AuctionDeposited", this.auctionDeposited.bind(this));
        this.contract.on("AuctionRefunded", this.auctionRefunded.bind(this));
        this.contract.on("AuctionProlonged", this.auctionProlonged.bind(this));
    }

    onModuleDestroy() {
        // this.contract.off("AuctionCreated", this.auctionCreated.bind(this));
        this.contract.on("AuctionBought", this.auctionSelled.bind(this));
        this.contract.off("AuctionDeposited", this.auctionDeposited.bind(this));
        this.contract.off("AuctionRefunded", this.auctionRefunded.bind(this));
        this.contract.off("AuctionProlonged", this.auctionProlonged.bind(this));
    }

    // private auctionCreated(...args: any[]) {
    //     const [auctionId, buyNowPrice, bidIncrement] = args;
    //     const e = args[args.length - 1];

    //     if (this.startBlockNumber >= e.blockNumber) {
    //         return;
    //     }

    //     this.eventEmitter.emit("auction.created", {
    //         auctionId,
    //         buyNowPrice: formatEther(buyNowPrice),
    //         bidIncrement: formatEther(bidIncrement),
    //     });
    // }

    private async auctionDeposited(auctionId: string, address: string, value: BigNumber, e: any) {

        if (this.startBlockNumber >= e.blockNumber) {
            return;
        }

        this.eventEmitter.emit("auction.deposited", {
            auctionId,
            address,
            value: formatEther(value)
        });
    }

    private async auctionSelled(auctionId: string, address: string, e: any) {
        this.eventEmitter.emit("auction.selled", {
            auctionId,
            address
        });
    }


    private auctionRefunded(auctionId: string, toAddress: string, value: BigNumber) {
        this.eventEmitter.emit("auction.refunded", {
            auctionId,
            toAddress,
            value: value.toNumber()
        });
    }

    private auctionProlonged(auctionId: string, endDate: BigNumber) {
        this.eventEmitter.emit("auction.prolonged", {
            auctionId,
            endDate: new Date(endDate.toNumber())
        });
    }

    async createAuction({
        auctionId,
        startDate,
        endDate,
        bidIncrement = 100,
        startPrice,
        buyNowPrice
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

    async refund(...args: any) {
        const tx = await this.contract.refund(...args);
        return await tx.wait();
    }

}
