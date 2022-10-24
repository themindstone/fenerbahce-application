import { Body, Controller, Get, Headers, Post } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventEmitter2 } from "@nestjs/event-emitter";
import Moralis from "moralis";
import { AbiCoder, formatUnits } from "nestjs-ethers";

@Controller("moralis")
export class MoralisStreamController {
    constructor(
        private readonly eventEmitter: EventEmitter2,
        private readonly configService: ConfigService,
    ) {}

    onModuleInit() {
        const apikey = this.configService.get("MORALIS_API_KEY");
        if (!apikey) {
            throw new Error("MORALIS_API_KEY is not defined");
        }

        Moralis.start({
            apiKey: apikey,
        });
    }

    @Get("/webhook")
    async webhook() {
        return "webhook get";
    }

    @Post("/webhook")
    async webhookPost(
        @Headers("x-signature") signature: string,
        @Body() params: any,
    ) {
        const log = params.logs[0];

        console.log("verifying...");

        Moralis.Streams.verifySignature({
            signature,
            body: params,
        });

        console.log("geliyor gelmekte olan");

        const auctionDepositedParams = ["uint32", "address", "uint256"];
        const auctionDepositedEvent =
            "0x28573a59b135946b59a8f696f86c287df11f9aa10bf7b9f1a499690b840ae20d";

        const auctionRefundedParams = ["uint32", "address", "uint256"];
        const auctionRefundedEvent =
            "0x42b9addd57622432772e24a2f9f559da5dbb4c7ff04f1da746079492403840b1";
        
        console.log("log: ", log);

        if (log.topics[0] === auctionDepositedEvent) {
            const [auctionId, address, value] = new AbiCoder().decode(
                auctionDepositedParams,
                log.data,
            );

            console.log("auctionDeposited", { auctionId, address, value });

            this.eventEmitter.emit("auction.deposited", {
                auctionId,
                address: address.toLocaleLowerCase(),
                value: value.toNumber(),
            });
        } else if (log.topics[0] === auctionRefundedEvent) {
            const [auctionId, address, value] = new AbiCoder().decode(
                auctionRefundedParams,
                log.data,
            );

            console.log("auctionRefunded", { auctionId, address, value });

            this.eventEmitter.emit("auction.refunded", {
                auctionId,
                address: address.toLocaleLowerCase(),
                value: value.toNumber(),
            });
        }
        return "Hello World!";
    }
}
