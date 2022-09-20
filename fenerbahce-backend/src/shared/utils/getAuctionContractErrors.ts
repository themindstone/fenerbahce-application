
export interface AuctionContractErrors {
    AlreadySelledError: string;
    AuctionNotFoundError: string;
    AuctionFinishedError: string;
    AuctionNotFinishedError: string;
    AuctionNotStartedError: string;
    AuctionStartPriceError: string;
    IncreaseByBidIncrementError: string;
    UnknownError: string;
    OwnableError: string;
	BelowBuyNowPriceError: string;
	AuctionRefundAlreadyDoneError: string;
}


export const AuctionContractErrorsEnglish: AuctionContractErrors = {
	AlreadySelledError: "This is already selled",
	AuctionNotFoundError: "There is no auction like that",
	AuctionFinishedError: "Auction finished",
	AuctionNotFinishedError: "Auction have not finished yet",
	AuctionNotStartedError: "Auction have not started yet",
	AuctionStartPriceError: "You need to start auction with auction start price",
	IncreaseByBidIncrementError: "You can only increase auction by bidIncrement",
	UnknownError: "An error occured",
	BelowBuyNowPriceError: "New buy now price needs to be bigger than the old price",
	OwnableError: "Ownable: caller is not the owner",
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
	BelowBuyNowPriceError: "Yeni hemen al fiyatı eskisinden daha büyük olmalıdır",
	OwnableError: "Ownable error: işlem yapabilmek için yeterli yetkilere sahip değilsiniz.",
	AuctionRefundAlreadyDoneError: "İade işlemi zaten yapıldı"
};

export const getAuctionContractErrorMessage = (e: string | null): string => {
	if (typeof e !== "string") {
		return AuctionContractErrorsEnglish.UnknownError;
	}

	for (const [k, v] of Object.entries(AuctionContractErrorsEnglish)) {
		if (e.includes(v)) {
			return AuctionContractErrorsEnglish[k as keyof AuctionContractErrors];
		}
	}

	return AuctionContractErrorsEnglish.UnknownError;
};
