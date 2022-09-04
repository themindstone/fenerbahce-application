import { ActionFunction } from "@remix-run/node";
import { Admin } from "~/pages";
import { ProductClient } from "~/client";
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
        const auctionStartPrice = formdata.get("auctionStartPrice");
        const auctionImmediatePrice = formdata.get("auctionImmediatePrice");

        try {
            await ProductClient.create({
                username,
                password,
                name,
                startDate,
                endDate,
                auctionStartPrice,
                auctionImmediatePrice,
                photoUrls,
                slug: slugify(name)
            });

            return {
                message: "Product created"
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
