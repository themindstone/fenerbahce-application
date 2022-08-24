import { ethers } from "ethers";
import { IWallet } from "~/interfaces";


export const MetamaskWallet: IWallet = {
    name: "Metamask",
    address: "",
    shortAddress: "",
    connectionState: "idle",
    isConnected: false,
    disconnect: function () {
    },
    connect: async function () {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            // Prompt user for account connections
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            
            this.address = await signer.getAddress();
            this.shortAddress = `${this.address.substring(0, 6)}...${this.address.substring(this.address.length - 4, this.address.length)}`;
            this.isConnected = true;
            this.connectionState = "connected";
        }
        catch (e: any) {
            this.connectionState = "failed";
            throw new Error(e);
        }
        
    },
    initialize: async function() {
        // list accounts
        // set account
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts(); 
        if (accounts[0]) {
            this.address = accounts[0] as string;
            this.shortAddress = `${this.address.substring(0, 6)}...${this.address.substring(this.address.length - 4, this.address.length)}`;
            this.isConnected = true;
            this.connectionState = "connected";
        }
        else {
            this.connectionState = "disconnected";
        }
    },
    getWallet: function(): IWallet {
        return Object.assign({}, this);
    },
};
