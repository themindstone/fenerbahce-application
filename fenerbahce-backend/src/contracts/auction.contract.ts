import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectContractProvider, InjectSignerProvider, EthersContract, EthersSigner, Wallet, Contract, BigNumber } from "nestjs-ethers";
import { auctionABI, auctionAddress } from "~/data";

export class AuctionContract {

    private wallet: Wallet;
    private contract: Contract;

    constructor(
        private eventEmitter: EventEmitter2,
        @InjectContractProvider()
        private readonly ethersContract: EthersContract,
        @InjectSignerProvider()
        private readonly ethersSigner: EthersSigner,
    ) {
        // this.eventEmitter = eventEmitter;
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
        this.contract.on("AuctionCreated", this.auctionCreated.bind(this));
        this.contract.on("AuctionDeposited", this.auctionDeposited.bind(this));
        this.contract.on("AuctionRefunded", this.auctionRefunded.bind(this));
        this.contract.on("AuctionProlonged", this.auctionProlonged.bind(this));
    }

    private auctionCreated(...args: any[]) {
        console.log("auction.created 1")
        this.eventEmitter.emit("auction.created", args);
    }

    private auctionDeposited(...args: any[]) {
        this.eventEmitter.emit("auction.deposited", args);
    }

    private auctionRefunded(...args: any[]) {
        this.eventEmitter.emit("auction.refunded", args);
    }

    private auctionProlonged(...args: any[]) {
        this.eventEmitter.emit("auction.prolonged", args);
    }

    async createAuction(auctionId: string, startDate: string, endDate: string, bidIncrement: number = 100) {
        
        const tx = await this.contract.createAuction(
            // formatBytes32String(auctionId),
            auctionId,
            BigNumber.from(new Date(startDate).getTime()),
            BigNumber.from(new Date(endDate).getTime()),
            BigNumber.from(bidIncrement),
        );
        const res = await tx.wait();
        console.log(res);

    }

    async refund(...args: any) {
        const tx = await this.contract.refund(...args);
        return await tx.wait();
    }

}
