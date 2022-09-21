// import React from "react";
import { Utility } from "~/pages/Utility";
// import { json } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import carouselStyles from "react-owl-carousel2/lib/styles.css";
// import { AuctionClient } from "~/client";

export let links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: carouselStyles }];
};



export default () => <Utility />;
