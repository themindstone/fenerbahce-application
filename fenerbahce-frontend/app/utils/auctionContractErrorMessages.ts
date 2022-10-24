import { AuctionContractErrors } from "~/interfaces";

export const AuctionContractErrorsEnglish: AuctionContractErrors = {
	UnknownError: "An error occured",
	InsufficentAllowance: "insufficient allowance",
	InsufficentBalance: "transfer amount exceeds balance",
};

export const AuctionContractErrorsTurkish: AuctionContractErrors = {
	UnknownError: "Bilinmeyen bir hata oluştu.",
	InsufficentAllowance: "Yetersiz fb token izninde dolayı işlem gerçekleştirilemedi",
	InsufficentBalance: "Yetersiz fb token bakiyesi dolayı işlem gerçekleştirilemedi",
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
