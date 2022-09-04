import { Utility } from "~/pages";
import { json, LinksFunction, LoaderFunction } from "@remix-run/node";
import carouselStyles from "react-owl-carousel2/lib/styles.css";
import { ProductClient } from "~/client";

export let links: LinksFunction = () => {
	return [
		{ rel: "stylesheet", href: carouselStyles },
	];
};

export const loader: LoaderFunction = async ({ context }) => {
	const highestOfferAuctions = await ProductClient.listHighestOfferAuctions();
	const activeAuctions = await ProductClient.listActiveAuctions();

	return json({
		highestOfferAuctions,
		activeAuctions
	});
}

export default () => <Utility />;
