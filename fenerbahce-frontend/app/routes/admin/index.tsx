import { json, LoaderFunction } from "@remix-run/node";
import { Home } from "~/pages";
import { config } from "~/configs";

export let loader: LoaderFunction = async ({ request }) => {
	return json({
		config,
	});
};

export default () => <Home />;
