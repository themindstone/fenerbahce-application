import { Utility } from "~/pages";
import { json, LinksFunction, LoaderFunction } from "@remix-run/node";
import carouselStyles from "react-owl-carousel2/lib/styles.css";
import { AuctionClient } from "~/client";

export let links: LinksFunction = () => {
	return [
		{ rel: "stylesheet", href: carouselStyles },
	];
};

export const loader: LoaderFunction = async ({ context }) => {
	const highestOfferAuctions = await AuctionClient.listHighestOfferAuctions();
	const activeAuctions = await AuctionClient.listActiveAuctions();

	return json({
		highestOfferAuctions,
		activeAuctions
	});
}

export default () => <Utility />;
