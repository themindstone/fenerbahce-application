import { APIClientInstance } from "~/utils";

export async function create(data: any) {
	const res = await APIClientInstance.post("auction/create", data);
	if (res.status === 401) {
		window.location.href = "/login";
	}
	return res.data;
}

export async function list() {
	const res = await APIClientInstance.get("auction/list");
	return res.data;
}

export async function listByPage(page: number) {
	const res = await APIClientInstance.get(`auction/${page}`);
	return res.data;
}

export async function update(productId: string, data: any) {
	const res = await APIClientInstance.put(`auction/update/${productId}`, data);
	return res.data;
}

export async function listActiveAuctions() {
	const res = await APIClientInstance.get("auction/list-active-auctions");
	return res.data;
}

export async function listUnfinishedAuctions() {
	const res = await APIClientInstance.get("auction/list-unfinished-auctions");
	return res.data;
}

export async function listHighestOfferAuctions() {
	const res = await APIClientInstance("auction/list-highest-offer-auctions");
	return res.data;
}

export async function getById(id: string) {
	const res = await APIClientInstance.get(`auction/${id}`);
	return res.data;
}

export const listFinishedAuctions = async (params: { page: number }) => {
	const res = await APIClientInstance.get("auction/list-finished-auctions", { params });
	return res.data;
};
