import { BFFClient } from "~/utils";

export async function create(data: any) {
    const res = await BFFClient.post("auction/create", data);
    return res.data;
}

export async function list() {
    const res = await BFFClient.get("auction/list");
    return res.data;
}

export async function listByPage(page: number) {
    const res = await BFFClient.get(`auction/:page`);
    return res.data;
}

export async function update(productId: string, data: any) {
    const res = await BFFClient.put(`auction/update/${productId}`, data);
    return res.data;
}

export async function listActiveAuctions() {
    const res = await BFFClient.get("auction/list-active-auctions");
    return res.data;
}

export async function listHighestOfferAuctions() {
    const res = await BFFClient("auction/list-highest-offer-auctions");
    return res.data;
}


export async function getById(id: string) {
    const res = await BFFClient.get(`auction/${id}`)
    return res.data;
}
