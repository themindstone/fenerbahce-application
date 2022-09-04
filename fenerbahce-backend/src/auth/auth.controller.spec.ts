import { Controller, NotFoundException, Param, Post } from "@nestjs/common";
import { Request } from "express";

@Controller("/auth")
export class AuthController {

    @Post("/login")
    login(@Param("username") username: string, @Param("password") password: string): { message: string } {
        if (username === "fb-user" && password === "fb-admin") {
            return {
                message: "success"
            };
        }
        throw new NotFoundException();
    }
};
