import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectContractProvider, InjectSignerProvider, EthersContract, EthersSigner, Wallet, Contract } from "nestjs-ethers";
import { auctionABI, auctionAddress } from "~/data";

export class AuctionContract {

    private wallet: Wallet;
    private contract: Contract;

    constructor(
        private readonly eventEmitter: EventEmitter2,
        @InjectContractProvider()
        private readonly ethersContract: EthersContract,
        @InjectSignerProvider()
        private readonly ethersSigner: EthersSigner,
    ) {
        
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
        this.contract.on("AuctionCreated", this.auctionCreated);
        this.contract.on("AuctionDeposited", this.auctionDeposited);
        this.contract.on("AuctionRefunded", this.auctionRefunded);
        this.contract.on("AuctionProlonged", this.auctionProlonged);
    }

    auctionCreated(...args: any[]) {
        this.eventEmitter.emitAsync("auction.created", args);
    }

    auctionDeposited(...args: any[]) {
        this.eventEmitter.emitAsync("auction.deposited", args);
    }

    auctionRefunded(...args: any[]) {
        this.eventEmitter.emitAsync("auction.refunded", args);
    }

    auctionProlonged(...args: any[]) {
        this.eventEmitter.emitAsync("auction.prolonged", args);
    }

    createAuction(...args: any[]) {
        this.contract.create(...args);
    }

    refund(...args: any) {
        this.contract.refund(...args);
    }

}
