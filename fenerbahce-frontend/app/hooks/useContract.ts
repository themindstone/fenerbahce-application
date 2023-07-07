import { Contract, ContractInterface, ethers } from "ethers";

export const connectContracts = (address: string, contractInterface: ContractInterface): Contract => {
	const provider = new ethers.providers.Web3Provider(window.ethereum as any);
	const signer = provider.getSigner();

	const contract = new ethers.Contract(address, contractInterface, signer);

	return contract;
};
