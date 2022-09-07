import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectContractProvider, InjectSignerProvider, EthersContract, EthersSigner, Wallet, Contract, BigNumber } from "nestjs-ethers";
import { auctionABI, auctionAddress } from "~/shared/data";

@Injectable()
export class AuctionContract {

    private wallet: Wallet;
    private contract: Contract;

    constructor(
        private eventEmitter: EventEmitter2,
        @InjectContractProvider()
        private readonly ethersContract: EthersContract,
        @InjectSignerProvider()
        private readonly ethersSigner: EthersSigner,
    ) {}

    onModuleInit() {
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

        this.contract.on("AuctionCreated(string,uint256,uint256,uint256)", this.auctionCreated.bind(this));
        this.contract.on("AuctionDeposited", this.auctionDeposited.bind(this));
        this.contract.on("AuctionRefunded", this.auctionRefunded.bind(this));
        this.contract.on("AuctionProlonged", this.auctionProlonged.bind(this));
    }

    onModuleDestroy() {
        this.contract.off("AuctionCreated(string,uint256,uint256,uint256)", this.auctionCreated.bind(this));
        this.contract.off("AuctionDeposited", this.auctionDeposited.bind(this));
        this.contract.off("AuctionRefunded", this.auctionRefunded.bind(this));
        this.contract.off("AuctionProlonged", this.auctionProlonged.bind(this));
    }

    private auctionCreated(auctionId: string, bidIncrement: BigNumber) {
        this.eventEmitter.emit("auction.created", {
            auctionId,
            bidIncrement: bidIncrement.toNumber()
        });
    }

    private auctionDeposited(auctionId: string, address: string, value: BigNumber) {
        this.eventEmitter.emit("auction.deposited", {
            auctionId,
            address,
            value: value.toNumber()
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

    async createAuction(auctionId: string, startDate: string, endDate: string, bidIncrement: number = 100) {
        
        const tx = await this.contract.createAuction(
            auctionId,
            BigNumber.from(new Date(startDate).getTime()),
            BigNumber.from(new Date(endDate).getTime()),
            BigNumber.from(bidIncrement),
        );
        return await tx.wait();
    }

    async refund(...args: any) {
        const tx = await this.contract.refund(...args);
        return await tx.wait();
    }

}
