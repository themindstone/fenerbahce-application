import { json, LoaderFunction } from "@remix-run/node";
import { UpdateBuyNowPrice } from "~/pages";
import { config } from "~/configs";

export const loader: LoaderFunction = () => {
	return json({
		config,
	});
};

export default () => <UpdateBuyNowPrice />;
