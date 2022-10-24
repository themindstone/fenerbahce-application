import { Body, Controller, Get, Header, Headers, Post } from "@nestjs/common";
import Moralis from "moralis";

@Controller("moralis")
export class MoralisStreamController {
    constructor() {
        console.log("merhaba dunya");
        console.log(Moralis.Streams);
    }

    @Get("/webhook")
    async webhook() {
        console.log("webhook get");
        return "webhook get";
    }

    @Post("/webhook")
    async webhookPost(
        @Headers("x-signature") signature: string,
        @Body() params: any,
    ) {
        console.log("webhook post", params);
        Moralis.Streams.verifySignature({
            signature,
            body: params,
        });
        return "webhook";
    }
}
