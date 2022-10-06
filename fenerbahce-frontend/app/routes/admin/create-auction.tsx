import { CreateAuction } from "~/pages";
import { json, LoaderFunction } from "@remix-run/node";
import { config } from "~/configs";

export const loader: LoaderFunction = () => {
	return json({
		config,
	});
};

export default () => <CreateAuction />;
