import { Auction } from "~/pages";
import { json } from "@remix-run/node";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import imageGalleryStyles from "react-image-gallery/styles/css/image-gallery.css";
import { AuctionClient, BalanceClient } from "~/client";
import { config } from "~/configs";

export let links: LinksFunction = () => {
	return [
		{ rel: "stylesheet", href: imageGalleryStyles },
	];
};

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url)
    const pathnames = url.pathname.split("/");
    const auctionId = pathnames[pathnames.length - 1];

    const auctionReq = AuctionClient.getById(auctionId);
    const auctionBalancesReq = BalanceClient.getHighestBalancesByAuctionId(auctionId);
    const auction = await Promise.all([auctionReq, auctionBalancesReq])
        .then(([auctionRes, auctionBalancesRes]) => {
            return {
                ...auctionRes,
                balances: auctionBalancesRes || []
            }
        });

	return json({
        auction,
        config
    });
}

export default () => <Auction />;
