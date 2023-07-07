import { Grid } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Layout } from "~/admincomponents";
import { useAuctionClient } from "~/client";
import { ProductCard } from "./components";

export const FinishedAuctions = () => {
	const auctionClient = useAuctionClient();

	const auctions = useQuery(["auctionsByPage", 0], () => {
		return auctionClient
			.listFinishedAuctions({
				page: 0,
			})
			.then(res => res.data || []);
	});

	return (
		<Layout authenticationRequired={false}>
			<Grid gridTemplateColumns="1fr 1fr 1fr" gap="20px">
				{auctions.isSuccess &&
					auctions.data.length > 0 &&
					(auctions.data as any[]).map((product: any) => {
						return (
							<ProductCard
								key={product.id}
								auctionId={product.id}
								name={product.name}
								buyNowPrice={product.buyNowPrice}
								photoUrls={product.photoUrls}
								highestOffer={product.highestOffer}
								endDate={product.endDate}
								isFinished={true}></ProductCard>
						);
					})}
				{auctions.isSuccess && auctions.data.length === 0 && "Gösterilecek bir şey yok"}
			</Grid>
		</Layout>
	);
};
