import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn } from "typeorm";


@Entity({
    name: "products"
})
export class Product {
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

    @Column({ name: "offers", type: "int", array: true })
    public offers: number[];

    @Column({ name: "start_date", type: "timestamp with time zone", nullable: false })
    public startDate: Date;

    @Column({ name: "end_date", type: "timestamp with time zone", nullable: false })
    public endDate: Date;

    @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
    public createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
    public updatedAt: Date;
}
