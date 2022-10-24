import { wallets } from "~/wallets";
import { IWallet } from "~/interfaces";

export interface ConnectWalletContextInterface {
    initialize: (name: keyof typeof wallets) => void;
    connect: () => void;
    disconnect: () => void;
    name: string;
    address: string;
    shortAddress: string;
    isConnected: boolean;
    connectionState: IWallet["connectionState"];
    isCorrectNetwork: boolean;
}

export interface ConnectWalletProviderInterface {
    children: React.ReactNode;
}
