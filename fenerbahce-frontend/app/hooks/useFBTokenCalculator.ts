import { useInterval } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useParibuClient } from "~/client";
import { modal1907EventBus } from "~/eventbus";

// const cacheTime = 30000;

export const useFBTokenCalculator = () => {
	const paribuClient = useParibuClient();

	const query = useQuery(
		["fbtokenprice"],
		() => {
			return paribuClient.getLatestFBTokenPrice();
		},
		{
			cacheTime: 30000,
		},
	);

	useInterval(() => {
		query.refetch();
	}, 30000);

	const fromFBTokenToTurkishLiras = (fbTokenQuantity: number) => {
		if (query.isError || !query.data) {
			modal1907EventBus.publish("modal.open", {
				isSucceed: false,
				description:
					"Fenerbahçe token fiyat bilgisi çekilemedi. Lütfen sayfayı yenileyip tekrar dener misiniz?",
			});
			return;
		}

		return fbTokenQuantity * query.data;
	};

	const fromTurkishLirasToFBToken = () => {};

	return {
		fromFBTokenToTurkishLiras,
		fromTurkishLirasToFBToken,
		price: query.isSuccess ? query.data : null,
	};
};
