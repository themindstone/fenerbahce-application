import { IWallet } from "~/interfaces";
import { ethers } from "ethers";

export const ParibuWallet: IWallet = {
    name: "Paribu",
    address: "",
    connectionState: "idle",
    disconnect: function (): IWallet {
        return this;
    },
    isConnected: false,
    connect: async function (): Promise<IWallet> {
        this.address = "0xaaa"
        return this;
    },
    initialize: async function(): Promise<IWallet> {
        // list accounts
        // set account
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts(); 
        if (accounts[0]) {
            this.address = accounts[0] as string;
        }
        return this;
    }
};
