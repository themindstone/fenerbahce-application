import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "~/users/users.service";
import * as bcrypt from "bcrypt";
import { from, map, Observable, of, switchMap } from "rxjs";

type RegisterUserDto = {
    fullname: string;
    email: string;
    password: string;
};

type RegisterUserResponseDto = {
    accessToken: string;
    refreshToken: string;
};

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        // private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) {}

    register(user: RegisterUserDto): Observable<RegisterUserResponseDto> {
        return this.hashPassword(user.password).pipe(
            switchMap((hash) => {
                const newUser = {
                    ...user,
                    password: hash,
                };
                return this.usersService.createUser(newUser).pipe(
                    switchMap((user) => {
                        const { password, ...result } = user;
                        const tokens = this.getTokens(result);

                        return this.updateRefreshToken({
                            id: result.id,
                            refreshToken: tokens.refreshToken,
                        }).pipe(map(() => tokens));
                    }),
                );
            }),
        );
    }

    login(
        email: string,
        password: string,
    ): Observable<{ accessToken: string; refreshToken: string } | null> {
        const user$ = this.usersService.findWithEmail(email);

        return user$.pipe(
            switchMap((user) => {
                if (!user) {
                    return of(null);
                }
                return this.comparePasswords(user.password, password).pipe(
                    switchMap((match) => {
                        if (match) {
                            const { password, ...result } = user;
                            const tokens = this.getTokens(result);
                            return this.updateRefreshToken({
                                id: result.id,
                                refreshToken: tokens.refreshToken,
                            }).pipe(map(() => tokens));
                        }
                        return of(null);
                    }),
                );
            }),
        );
    }

    getAuthenticatedUser(
        email: string,
        hashedPassword: string,
    ): Observable<{
        id: string;
        fullname: string;
        email: string;
    } | null> {
        return from(this.usersService.findWithEmail(email))
            .pipe(
                switchMap((user) => {
                    if (!user) {
                        return of(null);
                    }
                    return from(
                        this.comparePasswords(
                            user.password,
                            hashedPassword,
                        ).pipe(
                            switchMap((match) => {
                                if (match) {
                                    const { password, ...result } = user;
                                    return of(result);
                                }
                                return of(null);
                            }),
                        ),
                    );
                }),
            )
            .pipe();
    }

    private hashPassword(password: string): Observable<string> {
        return from(bcrypt.hash(password, 10));
    }

    private comparePasswords(
        hashedPassword: string,
        password: string,
    ): Observable<boolean> {
        return from(bcrypt.compare(password, hashedPassword));
    }

    private getTokens(params: {
        id: string;
        email: string;
        fullname: string;
    }): { accessToken: string; refreshToken: string } {
        const accessToken = this.jwtService.sign(params, {
            expiresIn: "30m",
            secret: "access_token_secret",
        });
        const refreshToken = this.jwtService.sign(params, {
            expiresIn: "7d",
            secret: "refresh_token_secret",
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    private updateRefreshToken(params: { id: string; refreshToken: string }) {
        return from(
            this.usersService.update(params.id, {
                refreshToken: params.refreshToken,
            }),
        );
    }

    refreshTokens(
        params: { id: string; fullname: string; email: string },
        refreshToken: string,
    ): Observable<{ accessToken: string; refreshToken: string } | null> {
        const user$ = this.usersService.findById(params.id);
        return user$.pipe(
            switchMap((user) => {
                if (!user) {
                    throw new ForbiddenException("Invalid user");
                }
                if (!user.refreshToken) {
                    throw new ForbiddenException("Invalid refresh token");
                }
                const isRefreshTokenMatching =
                    user.refreshToken === refreshToken;
                if (!isRefreshTokenMatching) {
                    throw new ForbiddenException("Invalid refresh token");
                }

                const tokens = this.getTokens({
                    id: user.id,
                    email: user.email,
                    fullname: user.fullname,
                });

                return this.updateRefreshToken({
                    id: params.id,
                    refreshToken: tokens.refreshToken,
                }).pipe(map(() => {
                    return tokens;
                }));
            }),
        );
    }
}
