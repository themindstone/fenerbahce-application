import { AuctionContractErrors } from "~/interfaces";

export const AuctionContractErrorsEnglish: AuctionContractErrors = {
	UnknownError: "An error occured",
	InsufficentAllowance: "insufficient allowance",
	InsufficentFBTokenBalance: "transfer amount exceeds balance",
	InsufficentBalance: "insufficient balance",
	UserDeniedTransaction: "user rejected transaction",
};

export const AuctionContractErrorsTurkish: AuctionContractErrors = {
	UnknownError: "Bilinmeyen bir hata oluştu.",
	InsufficentAllowance: "Yetersiz FB Token izninde dolayı işlem gerçekleştirilemedi",
	InsufficentFBTokenBalance: "Yetersiz FB Token bakiyesi dolayı işlem gerçekleştirilemedi",
	InsufficentBalance: "Yetersiz bakiye",
	UserDeniedTransaction: "İşlemi onaylamadınız",
};

export const getAuctionContractErrorMessage = (e: string | null) => {
	if (typeof e !== "string") {
		return;
	}

	for (const [k, v] of Object.entries(AuctionContractErrorsEnglish)) {
		if (e.includes(v)) {
			return AuctionContractErrorsTurkish[k as keyof AuctionContractErrors];
		}
	}

	return AuctionContractErrorsTurkish.UnknownError;
};
