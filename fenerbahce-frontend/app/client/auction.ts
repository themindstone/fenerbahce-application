import { Client } from "~/utils";

async function create(data: any) {
    const res = await Client.post("auction/create", data);
    return res.data;
}

async function list() {
    const res = await Client.get("auction/list");
    return res.data;
}

async function listByPage(page: number) {
    const res = await Client.get(`auction/:page`);
    return res.data;
}

async function update(productId: string, data: any) {
    const res = await Client.put(`auction/update/${productId}`, data);
    return res.data;
}

async function listActiveAuctions() {
    const res = await Client.get("auction/list-active-auctions");
    return res.data;
}

async function listHighestOfferAuctions() {
    const res = await Client("auction/list-highest-offer-auctions");
    return res.data;
}

async function getBySlug(slug: string) {
    const res = await Client.get(`auction/slug/${slug}`);
    return res.data;
}

export default {
    create,
    list,
    listByPage,
    update,
    listActiveAuctions,
    listHighestOfferAuctions,
    getBySlug,
};
