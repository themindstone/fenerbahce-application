import { ActionFunction } from "@remix-run/node";
import { CreateAuction } from "~/pages";
import { AuctionClient } from "~/client";
import { json, LoaderFunction } from "@remix-run/node";
import { config } from "~/configs";

export const loader: LoaderFunction = () => {
	return json({
		config,
	});
};

export const action: ActionFunction = async ({ request }) => {
	const formdata = await request.formData();

	if (formdata.get("_method") === "add_product") {
		const username = formdata.get("username");
		const password = formdata.get("password");
		const name = formdata.get("name") as string;
		const photoUrls = formdata.getAll("photoUrls[]");
		let startDate = new Date(formdata.get("startDate") as string);
		let endDate = new Date(formdata.get("endDate") as string);
		const startPrice = formdata.get("startPrice");
		const buyNowPrice = formdata.get("buyNowPrice");
		const bidIncrement = formdata.get("bidIncrement");

		const startTime = new Date(new Date(startDate).getTime() - 3 * 1000 * 60 * 60);
		const endTime = new Date(new Date(endDate).getTime() - 3 * 1000 * 60 * 60);


		try {
			await AuctionClient.create({
				username,
				password,
				name,
				startDate: startTime,
				endDate: endTime,
				startPrice: startPrice,
				buyNowPrice: buyNowPrice,
				photoUrls,
				bidIncrement: Number(bidIncrement),
			});

			return {
				message: "Auction created",
			};
		} catch (e) {
			return {
				message: "error adding product",
			};
		}
	}

	return {
		error: "error",
	};
};

export default () => <CreateAuction />;
