import { NotFoundException } from "@nestjs/common";
import { AuthController } from "~/auth/auth.controller";
import { AuthService } from "~/auth/auth.service";

describe("Auth Controller", () => {
    let authController: AuthController;
    let authService: AuthService;


    beforeEach(() => {
        authService = new AuthService();
        authController = new AuthController(authService);
    });

    describe("Test login function", () => {
        it("should return { message: 'success' }", () => {
            const result = authController.login("fb-admin", "fb-admin");
            expect(result).toBe({ message: "success" });
        });

        it("should return not found exception", () => {
            const result = authController.login("invalid username", "invalid password");
            expect(result).toThrowError(new NotFoundException());
        });
    });

});