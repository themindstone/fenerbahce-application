import { Injectable } from "@nestjs/common";



@Injectable()
export class AuthService {

    isAuthenticated(username: string, password: string): boolean {
        if (username === "fb-admin" && password === "fb-admin") {
            return true;
        }

        return false;
    }
}
