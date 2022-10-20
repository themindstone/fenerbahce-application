import { Body, Controller, ForbiddenException, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { AccessTokenAuthGuard, LocalAuthGuard, RefreshTokenAuthGuard } from "./guards";
import { RegisterDto, SignInDto } from "./models";

interface ReqWithUser extends Request {
    user: { id: string; fullname: string; email: string; refreshToken?: string };
}

@Controller("/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/register")
    register(@Body() params: RegisterDto) {
        return this.authService.register(params);
    }

    @Post("/login")
    @UseGuards(LocalAuthGuard)
    login(@Body() params: SignInDto) {
        // const { id, email, fullname } = req.user;
        // return { id, email, fullname };
        return this.authService.login(params.email, params.password);
    }

    @Get("refresh")
    @UseGuards(RefreshTokenAuthGuard)
    refreshTokens(@Req() req: ReqWithUser) {
        const { id, fullname, email } = req.user;
        const refreshToken = req.user["refreshToken"];
        if (!refreshToken) {
            throw new ForbiddenException("Refresh token not found");
        }
        return this.authService.refreshTokens({ id, fullname, email }, refreshToken);
    }

    @Get("/me")
    @UseGuards(AccessTokenAuthGuard)
    me(@Req() req: ReqWithUser) {
        return req.user;
    }
}
