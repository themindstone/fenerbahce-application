import { Utility } from "~/pages";
import { json } from "@remix-run/node";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import carouselStyles from "react-owl-carousel2/lib/styles.css";
import { AuctionClient } from "~/client";
import { config } from "~/configs";

export let links: LinksFunction = () => {
	return [
		{ rel: "stylesheet", href: carouselStyles },
	];
};

export const loader: LoaderFunction = async ({ context }) => {
	const highestOfferAuctions = await AuctionClient.listHighestOfferAuctions();
	const activeAuctions = await AuctionClient.listActiveAuctions();
	const finishedAuctions = await AuctionClient.listFinishedAuctions({ page: 0 });

	console.log(config)
	return json({
		highestOfferAuctions,
		activeAuctions,
		finishedAuctions,
		config
	});
}

export default () => <Utility />;
