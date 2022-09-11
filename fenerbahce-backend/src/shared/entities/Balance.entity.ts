import { Column, Entity, Generated, Index, PrimaryColumn } from "typeorm";


@Entity({
    name: "balances"
})
@Index("idx_balance_user_address_auction_id", ["userAddress", "auctionId"], { unique: true })
export class Balance {
    @PrimaryColumn({ name: "id", type: "uuid" })
    @Generated("uuid")
    public id: string;

    @Column({ name: "auction_id", type: "uuid", nullable: false })
    public auctionId: string;

    @Column({ name: "user_address", type: "varchar", nullable: false })
    public userAddress: string;

    @Column({ name: "balance", type: "float", nullable: false })
    public balance: number;
}

