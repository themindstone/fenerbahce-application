import { Client } from "~/utils";

async function create(data: any) {
    const res = await Client.post("product/create", data);
    return res.data;
}

async function list() {
    const res = await Client.get("product/list");
    return res.data;
}

async function listByPage(page: number) {
    const res = await Client.get(`product/:page`);
    return res.data;
}

async function update(productId: string, data: any) {
    const res = await Client.put(`product/update/${productId}`, data);
    return res.data;
}

async function listActiveAuctions() {
    const res = await Client.get("product/list-active-auctions");
    return res.data;
}

async function listHighestOfferAuctions() {
    const res = await Client("product/list-highest-offer-auctions");
    return res.data;
}

async function getBySlug(slug: string) {
    const res = await Client.get(`product/slug/${slug}`);
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
