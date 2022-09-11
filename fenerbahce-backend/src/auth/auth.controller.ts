import { Controller, NotFoundException, Param, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/login")
    login(
        @Param("username") username: string,
        @Param("password") password: string,
    ): { message: string } {
        const isAuthenticated = this.authService.isAuthenticated(
            username,
            password,
        );
        if (!isAuthenticated) throw new NotFoundException();
        return {
            message: "success",
        };
    }
}
