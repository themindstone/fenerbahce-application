import { Fragment, ReactElement } from "react";
import React from "react";
import { Header } from "~/components";
import { ActiveAuctions, Hero } from "./components";

export const Utility = (): ReactElement => {
	return (
		<Fragment>
			<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
			<Header />
			<Hero />
			<ActiveAuctions />
		</Fragment>
	);
};
