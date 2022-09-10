import { Auction } from "~/pages";
import { json, LinksFunction, LoaderFunction } from "@remix-run/node";
import imageGalleryStyles from "react-image-gallery/styles/css/image-gallery.css";
import { AuctionClient } from "~/client";

export let links: LinksFunction = () => {
	return [
		{ rel: "stylesheet", href: imageGalleryStyles },
	];
};

export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url)
    const pathnames = url.pathname.split("/");
    const slug = pathnames[pathnames.length - 1];

    const auction = await AuctionClient.getBySlug(slug);

	return json({
        auction,
    });
}

export default () => <Auction />;
