import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity({ name: "kyc_users" })
export class KYC {
    @PrimaryColumn({ name: "id", type: "uuid" })
    @Generated("uuid")
    public id: string;

    @Column("varchar", { name: "fullname" })
    public fullname: string;

    @Column("varchar", { name: "address" })
    public address: string;

    @Column("varchar", { name: "email" })
    public email: string;

    @Column("varchar", { name: "string" })
    public phone: string;
}
