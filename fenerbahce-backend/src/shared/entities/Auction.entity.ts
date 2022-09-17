import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    JoinColumn,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { Balance } from "./Balance.entity";

@Entity({
    name: "auctions",
})
export class Auction {
    @PrimaryColumn({ name: "id", type: "uuid" })
    @Generated("uuid")
    public id: string;

    @Column({ name: "name", type: "varchar", nullable: false })
    public name: string;

    @Column({ name: "selled_to_address", type: "varchar", nullable: true })
    public selledToAddress: string;

    // @Column({ name: "slug", type: "varchar", nullable: false })
    // public slug: string;

    @Column({ name: "photoUrls", type: "text", nullable: false, array: true })
    public photoUrls: string[];

    @Column({ name: "start_price", type: "float", nullable: false })
    public startPrice: number;

    @Column({ name: "buynow_price", type: "float", nullable: false })
    public buyNowPrice: number;

    @Column({
        name: "bid_increment",
        type: "float",
        nullable: false,
        default: 0,
    })
    public bidIncrement: number;

    // TODO: cascade will be added to products table
    @OneToMany(() => Balance, (balance) => balance.auctionId)
    @JoinColumn()
    public balances: Balance[];

    @Column({
        name: "start_date",
        type: "timestamp with time zone",
        nullable: false,
    })
    public startDate: Date;

    @Column({
        name: "end_date",
        type: "timestamp with time zone",
        nullable: false,
    })
    public endDate: Date;

    @Column({
        name: "is_selled",
        type: "boolean",
        nullable: false,
        default: false,
    })
    public isSelled: boolean;

    @Column({
        name: "is_active",
        type: "boolean",
        nullable: false,
        default: false,
    })
    public isActive: boolean;

    @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
    public createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
    public updatedAt: Date;
}
