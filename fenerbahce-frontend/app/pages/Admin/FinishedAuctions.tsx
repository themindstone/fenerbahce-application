import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Layout } from "~/admincomponents";
import { useAuctionClient } from "~/client";

export const FinishedAuctions = () => {

    const [pageNumber, setPageNumber] = useState<number>(0);

    const auctionClient = useAuctionClient();

    const auctions = useQuery(["auctionsByPage", pageNumber], () => {
		return auctionClient
			.listFinishedAuctions({
				page: pageNumber,
			})
			.then(res => res.data);
	});


	return <Layout>
        ok
    </Layout>
};
