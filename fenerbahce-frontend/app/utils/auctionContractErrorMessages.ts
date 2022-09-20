import { AuctionContractErrors } from "~/interfaces";

export const AuctionContractErrorsEnglish: AuctionContractErrors = {
	AlreadySelledError: "This is already selled",
	AuctionNotFoundError: "There is no auction like that",
	AuctionFinishedError: "Auction finished",
	AuctionNotFinishedError: "Auction have not finished yet",
	AuctionNotStartedError: "Auction have not started yet",
	AuctionStartPriceError: "You need to start auction with auction start price",
	IncreaseByBidIncrementError: "You can only increase auction by bidIncrement",
	UnknownError: "An error occured",
	OwnableError: "Ownable: caller is not the owner",
    BelowBuyNowPriceError: "New buy now price needs to be bigger than the old price",
	AuctionRefundAlreadyDoneError: "Auction refund done",
};

export const AuctionContractErrorsTurkish: AuctionContractErrors = {
	AlreadySelledError: "Bu açık artırma zaten satın alındı.",
	AuctionNotFoundError: "Açık artırma bulunamadı.",
	AuctionFinishedError: "Bu açık artırma süresi doldu.",
	AuctionNotFinishedError: "Açık artırma henüz bitmedi.",
	AuctionNotStartedError: "Bu açık artırma başlamadı.",
	AuctionStartPriceError: "Bu açık artırmaya minimum açık artırma fiyatı ile başlamanız gerekiyor.",
	IncreaseByBidIncrementError: "Açık artırmaya yalnızca artırma oranı kadar artırma yaparak katılabilirsiniz.",
	UnknownError: "Bilinmeyen bir hata oluştu.",
	OwnableError: "Ownable error: işlem yapabilmek için yeterli yetkilere sahip değilsiniz.",
    BelowBuyNowPriceError: "Yeni hemen al fiyatı eskisinden daha büyük olmalıdır",
	AuctionRefundAlreadyDoneError: "İade işlemi zaten yapıldı",
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
