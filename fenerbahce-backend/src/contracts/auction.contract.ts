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
const Moralis = require("moralis-v1/node");

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
    ) {}

    async onModuleInit() {
        const auctionAddress = this.configService.get("AUCTION_CONTRACT_ADDRESS");
        const moralisAppId = this.configService.get("MORALIS_APP_ID");
        const moralisServerUrl = this.configService.get("MORALIS_SERVER_URL");
        const moralisMasterKey = this.configService.get("MORALIS_MASTER_KEY");
        const wallet = this.configService.get<string>("WALLET")
        if (!auctionAddress) {
            throw new Error("You need to provide auction contract address")
        }
        if (!wallet) {
            throw new Error("Wallet does not exist");
        }
        Moralis.start({ appId: moralisAppId, serverUrl: moralisServerUrl, masterKey: moralisMasterKey });
        
        const auctionCreatedEventClient = new Moralis.Query("AuctionCreated");
        const auctionCreatedEventSubscription = await auctionCreatedEventClient.subscribe();

        auctionCreatedEventSubscription.on("create", (object: any) => {
            console.log("object created");
            console.log(object);
        });

        auctionCreatedEventSubscription.on("open", () => {
            console.log("opened")
        });

        auctionCreatedEventSubscription.on("error", () => {
            console.log("error")
        });

        auctionCreatedEventSubscription.on("update", (object: any) => {
            console.log("update: ", object)
        });

        auctionCreatedEventSubscription.on("close", () => {
            console.log("closed");
        });

        this.wallet = this.ethersSigner.createWalletfromMnemonic(
            wallet
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
        this.contract.on(
            "AuctionBuyNowPriceUpdated",
            this.auctionBuyNowPriceUpdated.bind(this),
        );
    }

    onModuleDestroy() {
        // unsubscribing for events from contract's provider
        this.contract.off("AuctionSelled", this.auctionSelled.bind(this));
        this.contract.off("AuctionDeposited", this.auctionDeposited.bind(this));
        this.contract.off("AuctionRefunded", this.auctionRefunded.bind(this));
        this.contract.off("AuctionProlonged", this.auctionProlonged.bind(this));
        this.contract.off(
            "AuctionBuyNowPriceUpdated",
            this.auctionBuyNowPriceUpdated.bind(this),
        );
    }

    private async auctionDeposited(
        auctionId: string,
        address: string,
        value: BigNumber,
        e: any,
    ) {
        console.log("merhaba dunya2")
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
        e: any,
    ) {
        if (this.startBlockNumber >= e.blockNumber) {
            return;
        }

        this.eventEmitter.emit("auction.refunded", {
            auctionId,
            toAddress,
            value: formatEther(value),
        });
    }

    async auctionBuyNowPriceUpdated(
        auctionId: string,
        newBuyNowPrice: BigNumber,
        e: any,
    ) {
        if (this.startBlockNumber >= e.blockNumber) {
            return;
        }

        this.eventEmitter.emit("auction.buynowpriceupdated", {
            auctionId,
            newBuyNowPrice: formatEther(newBuyNowPrice),
        });
    }

    private auctionProlonged(auctionId: string, endDate: BigNumber, e: any) {
        if (this.startBlockNumber >= e.blockNumber) {
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
        return await Promise.all(losers.map(async loser => {
            const tx = await this.contract.refund(auctionId, loser);
            await tx.wait();
        }));
    }
}
