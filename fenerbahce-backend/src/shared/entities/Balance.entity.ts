import { Column, Entity, Generated, Index, PrimaryColumn } from "typeorm";


@Entity({
    name: "balances"
})
@Index("idx_balance_user_address_auction_id", ["userAddress", "auctionId"], { unique: true })
export class Balance {
    @PrimaryColumn({ name: "id", type: "uuid" })
    @Generated("uuid")
    public id: string;

    @Column({ name: "auction_id", type: "uuid" })
    public auctionId: string;

    @Column({ name: "user_address", type: "varchar" })
    public userAddress: string;

    @Column({ name: "balance", type: "int" })
    public balance: string;
}

