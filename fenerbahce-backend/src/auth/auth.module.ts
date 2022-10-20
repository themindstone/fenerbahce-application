import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccessTokenStrategy } from "./strategies/accesstoken.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { RefreshTokenStrategy } from "./strategies/refreshtoken.strategy";



@Module({
    imports: [AuthModule],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, LocalStrategy],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}

