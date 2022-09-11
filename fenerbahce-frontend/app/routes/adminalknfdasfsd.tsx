import { ActionFunction } from "@remix-run/node";
import { Admin } from "~/pages";
import { AuctionClient } from "~/client";
import slugify from "slugify";


export const action: ActionFunction = async ({
    request
}) => {

    const formdata = await request.formData();

    if (formdata.get("_method") === "add_product") {
        const username = formdata.get("username");
        const password = formdata.get("password");
        const name = formdata.get("name") as string;
        const photoUrls = formdata.getAll("photoUrls[]");
        const startDate = new Date(formdata.get("startDate") as string);
        const endDate = new Date(formdata.get("endDate") as string);
        const startPrice = formdata.get("startPrice");
        const buyNowPrice = formdata.get("buyNowPrice");
        const bidIncrement = formdata.get("bidIncrement");

        try {
            await AuctionClient.create({
                username,
                password,
                name,
                startDate,
                endDate,
                startPrice,
                buyNowPrice,
                photoUrls,
                bidIncrement,
                slug: slugify(name)
            });

            return {
                message: "Auction created"
            };
        }
        catch (e) {
            return {
                message: "error adding product"
            }
        }
    }

    return {
        error: "error"
    };
};

export default () => <Admin />
