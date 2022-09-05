import { Column, Entity, Generated, PrimaryColumn } from "typeorm";


@Entity({
    name: "offers"
})
export class Offer {
    @PrimaryColumn({ name: "id", type: "uuid" })
    @Generated("uuid")
    public id: string;

    @Column({ name: "product_id", type: "uuid" })
    public product_id: string;

    @Column({ name: "address", type: "varchar" })
    public address: string;

    @Column({ name: "offer", type: "int" })
    public offer: string;
}

