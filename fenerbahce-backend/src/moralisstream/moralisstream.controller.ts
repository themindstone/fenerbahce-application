import { Controller, Get, Post } from "@nestjs/common";


@Controller("moralis")
export class MoralisStreamController {

    @Get("/webhook")
    async webhook() {
        console.log("webhook get");
        return "webhook get";
    }

    @Post("/webhook")
    async webhookPost() {
        console.log("webhook post");
        return "webhook";
    }

}