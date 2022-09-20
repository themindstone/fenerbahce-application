
export interface IWallet {
    name: "Metamask" | "Paribu";
    address: string;
    isConnected: boolean;
    connectionState: "connected" | "failed" | "idle" | "disconnected";
    shortAddress: string;
    connect: () => void;
    disconnect: () => void;
    initialize: () => void;
    getWallet: () => IWallet;
};
