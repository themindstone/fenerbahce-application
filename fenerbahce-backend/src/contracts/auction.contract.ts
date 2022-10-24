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
    InjectEthersProvider,
    Provider,
} from "nestjs-ethers";
import { auctionABI } from "~/shared/data";
import { MoralisAPIService } from "~/shared/libs";
import { AuctionContractDevelopment } from "./auction.contract.dev";
import { AuctionContractProduction } from "./auction.contract.prod";

interface AuctionContractCreateAuctionDto {
    startDate: string;
    endDate: string;
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

    // This will be refactored with registerAsync methods
    async onModuleInit() {
        // const auctionAddress = this.configService.get(
        //     "AUCTION_CONTRACT_ADDRESS",
        // );
        // const nodeEnv = this.configService.get("NODE_ENV");
        // const wallet = this.configService.get<string>("WALLET");
        // if (!auctionAddress) {
        //     throw new Error("AUCTION_CONTRACT_ADDRESS must exist!");
        // }
        // if (!wallet) {
        //     throw new Error("WALLET must exist!");
        // }
        // if (!nodeEnv) {
        //     throw new Error("NODE_ENV must exist!");
        // }
        // try {
        //     this.wallet = this.ethersSigner.createWalletfromMnemonic(wallet);
        //     this.contract = this.ethersContract.create(
        //         auctionAddress,
        //         auctionABI,
        //         this.wallet,
        //     );
        // } catch {
        //     throw new Error("Error connecting to the contract");
        // }
        // this.startBlockNumber = await this.provider.getBlockNumber();

        // if (nodeEnv === "production") {
        //     // const contractProvider = new AuctionContractProduction(
        //     //     this.eventEmitter,
        //     //     this.startBlockNumber,
        //     // );
        //     // this.moralisApiService.LiveQuery("AuctionDeposited", (object) =>
        //     //     contractProvider.auctionDeposited(object.attributes),
        //     // );
        //     // this.moralisApiService.LiveQuery("AuctionRefunded", (object) =>
        //     //     contractProvider.auctionRefunded(object.attributes),
        //     // );
        // } else {
        //     // const contractProvider = new AuctionContractDevelopment(
        //     //     this.eventEmitter,
        //     //     this.startBlockNumber,
        //     // );
        //     // this.contract.on(
        //         // "AuctionDeposited",
        //         // contractProvider.auctionDeposited.bind(contractProvider),
        //     // );
        //     // this.contract.on(
        //     //     "AuctionRefunded",
        //     //     contractProvider.auctionRefunded.bind(contractProvider),
        //     // );
        // }
    }

    async getLatestId() {
        return await this.contract.getLatestId();
    }
}
