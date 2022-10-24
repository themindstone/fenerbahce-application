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

        if (!params.confirmed) {
            return "not confirmed";
        }
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

        const decoder = new AbiCoder();

        if (log.topic0 === auctionDepositedEvent) {
            console.log("auction deposited");
            const [auctionId, address, val] = decoder.decode(
                auctionDepositedParams,
                log.data,
            );

            const value = formatUnits(val, "6");

            console.log({ auctionId, address, value });

            this.eventEmitter.emit("auction.deposited", {
                auctionId,
                address: address.toLocaleLowerCase(),
                value: value,
            });
        } else if (log.topic0 === auctionRefundedEvent) {
            console.log("auction refunded");

            const [auctionId, address, val] = decoder.decode(
                auctionRefundedParams,
                log.data,
            );

            const value =formatUnits(val, "6");

            console.log({ auctionId, address, value });

            this.eventEmitter.emit("auction.refunded", {
                auctionId,
                address: address.toLocaleLowerCase(),
                value: value,
            });
        }
        return "Hello World!";
    }
}
