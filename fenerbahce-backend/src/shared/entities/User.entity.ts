import { BeforeInsert, Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
    @PrimaryColumn({ name: "id", type: "uuid" })
    @Generated("uuid")
    id: string;

    @Column({ name: "fullname", type: "varchar", nullable: false })
    fullname: string;

    @Column({ name: "email", type: "varchar", nullable: false, unique: true })
    email: string;

    @Column({ name: "password", type: "varchar", nullable: false, select: false })
    password: string;


    @Column({ name: "refresh_token", type: "varchar", nullable: true })
    refreshToken: string;

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}
