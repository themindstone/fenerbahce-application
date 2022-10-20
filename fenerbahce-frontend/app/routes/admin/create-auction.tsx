import { CreateAuction } from "~/pages";
import { json, LoaderFunction } from "@remix-run/node";
import { config } from "~/configs";
import { Layout } from "~/admincomponents";

export const loader: LoaderFunction = () => {
	return json({
		config,
	});
};

export default () => (
	<Layout authenticationRequired={true}>
		<CreateAuction />
	</Layout>
);
