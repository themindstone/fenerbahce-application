import { json, LoaderFunction } from "@remix-run/node";
import { config } from "~/configs";
import { FinishedAuctions } from "~/pages";

export const loader: LoaderFunction = () => {

	return json({
		config,
	});
};


export default () => {
    return <FinishedAuctions />
}
