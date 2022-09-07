import { Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Offer } from "./Offer.entity";


@Entity({
    name: "auctions"
})
export class Auction {
    @PrimaryColumn({ name: "id", type: "uuid" })
    @Generated("uuid")
    public id: string;

    @Column({ name: "name", type: "varchar", nullable: false })
    public name: string;

    @Column({ name: "slug", type: "varchar", nullable: false })
    public slug: string;

    @Column({ name: "photoUrls", type: "text", nullable: false, array: true })
    public photoUrls: string[];

    @Column({ name: "auction_start_price", type: "int", nullable: false })
    public auctionStartPrice: number;

    @Column({ name: "auction_immediate_price", type: "int", nullable: false })
    public auctionImmediatePrice: number;

    @Column({ name: "bid_increment", type: "int", nullable: false, default: 0 })
    public bidIncrement: number;

    // TODO: cascade will be added to products table
    @OneToMany(() => Offer, (offer) => offer.auction_id) @JoinColumn()
    public offers: Offer[];

    @Column({ name: "start_date", type: "timestamp with time zone", nullable: false })
    public startDate: Date;

    @Column({ name: "end_date", type: "timestamp with time zone", nullable: false })
    public endDate: Date;

    @Column({ name: "is_active", type: "boolean", nullable: false, default: false })
    public isActive: boolean;

    @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
    public createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
    public updatedAt: Date;
}
