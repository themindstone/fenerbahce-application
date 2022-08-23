
export interface IWallet {
    name: "Metamask" | "Paribu";
    address: string;
    isConnected: boolean;
    connectionState: "connected" | "failed" | "idle";
    connect: () => void;
    disconnect: () => void;
    initialize: () => void;
    getWallet: () => IWallet;
};
