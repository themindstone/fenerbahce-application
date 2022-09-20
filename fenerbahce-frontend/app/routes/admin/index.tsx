import { LoaderFunction } from "@remix-run/node";
import { json } from "remix-utils";
import { AdminHome } from "~/pages";
import { config } from "~/configs";


export const loader: LoaderFunction = () => {
	return json({
		config,
	});
};


export default () => <AdminHome />
