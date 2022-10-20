import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable, of, switchMap, map } from "rxjs";
import { Repository } from "typeorm";
import { User } from "~/shared/entities";
import bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    createUser(params: {
        fullname: string;
        password: string;
        email: string;
    }): Observable<User> {
        return from(
            this.userRepository.save(params),
        ).pipe(
            switchMap((user) => {
                return of(user);
            }),
        );
    }


    update(id: string, params: Partial<User>) {
        return this.userRepository.update(id, params);
    }

    findWithEmail(email: string): Observable<User | null> {
        return from(this.userRepository.findOne({ where: { email }, select: ["email", "password", "fullname", "id"] })).pipe(
            map((user) => {
                if (user) {
                    return user;
                } else {
                    return null;
                }
            }),
        );
    }

    findById(id: string): Observable<User | null> {
        return from(this.userRepository.findOne({ where: { id }})).pipe(
            map((user) => {
                if (user) {
                    return user;
                } else {
                    return null;
                }
            }),
        );
    }
}
