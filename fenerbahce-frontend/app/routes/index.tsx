import { Utility } from "~/pages";
import { LinksFunction } from "@remix-run/node";
import carouselStyles from "react-owl-carousel2/lib/styles.css";

export let links: LinksFunction = () => {
	return [
		{ rel: "stylesheet", href: carouselStyles },
	];
};

export default () => <Utility />;
