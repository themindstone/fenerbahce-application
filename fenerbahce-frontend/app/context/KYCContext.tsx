import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { KYCClient } from "~/client";
import { KYCModal } from "~/components";
import { KYCModalEventBus } from "~/eventbus";
import { useConnectWallet } from "./MetamaskConnectContext";

interface KYCContextInterface {
	fullname: string;
	address: string;
	email: string;
	phone: string;
	create: (params: {
		fullname: string;
		address: string;
		email: string;
		phone: string;
	}) => Promise<{ isError: boolean; errorMessage?: string }>;
	// isKycVerified: boolean;
}

const KYCContext = React.createContext<KYCContextInterface>({
	fullname: "",
	address: "",
	email: "",
	phone: "",
	create: async params => ({ isError: false }),
});

export const KYCProvider = (props: { children: React.ReactNode }) => {
	const [customer, setCustomer] = useState<Omit<KYCContextInterface, "create">>({ fullname: "", address: "", email: "", phone: ""});
	const connectWallet = useConnectWallet();

	const kycQuery = useQuery(
		["kyc_user", connectWallet.address],
		() => {
			return KYCClient.getUserByAddress({ address: connectWallet.address });
		},
		{ enabled: connectWallet.isConnected },
	);

	useEffect(() => {
		const d = kycQuery.data;
		if (!connectWallet.isConnected) {
			return;
		}
		if (d === null) {
			KYCModalEventBus.publish("kycmodal.open");
			return;
		}
		if (!d) {
			return;
		}
		if (!d.address) {
			KYCModalEventBus.publish("kycmodal.open");
			return;
		}
		setCustomer({
			fullname: d.fullname,
			address: d.address,
			email: d.email,
			phone: d.phone,
		});
	}, [kycQuery.data, connectWallet]);

	console.log(kycQuery);

	const create = async (params: {
		fullname: string;
		address: string;
		email: string;
		phone: string;
	}): Promise<{ isError: boolean; errorMessage?: string }> => {
		if (kycQuery.data.address) {
			return { isError: true, errorMessage: "Kullanıcı sisteminde böyle bir adres bulunmaktadır." };
		}
		try {
			await KYCClient.create(params);
			setCustomer(params);
			return { isError: false };
		} catch (error: any) {
			return { isError: true, errorMessage: "KYC sisteminde bir sorun oluştu." };
		}
	};

	return (
		<KYCContext.Provider value={{ ...customer, create }}>
			{props.children}
			<KYCModal />
		</KYCContext.Provider>
	);
};

export const useKYC = () => {
	const kycContext = React.useContext(KYCContext);

	const isVerified = useMemo(() => {
		if (kycContext.email) {
			return true;
		}
		return false;
	}, [kycContext]);

	return { ...kycContext, isVerified };
};
