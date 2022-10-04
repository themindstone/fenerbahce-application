import { APIClientInstance } from "~/utils";

export const getUserByAddress = async (params: { address: string }) => {
	const res = await APIClientInstance.get(`kyc/address/${params.address}`);
	return res.data;
};

export const create = async (params: { fullname: string; address: string; email: string; phone: string }) => {
	const res = await APIClientInstance.post("kyc/create", params);
    return res.data;
};


