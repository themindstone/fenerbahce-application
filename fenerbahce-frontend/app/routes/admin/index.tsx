import { json, LoaderFunction, redirect } from "@remix-run/node";
import { UpdateBuyNowPrice } from "~/pages";
import { config } from "~/configs";
// import { getSession, destroySession } from "~/cookies";
import { APIClientInstance } from "~/utils";

// export const loader: LoaderFunction = () => {
// };

export let loader: LoaderFunction = async ({ request }) => {
	// const redirectTo = new URL(request.url).pathname;

	// const session = await getSession(request.headers.get("Cookie"));
	// console.log(session.data);

	// if (!session.has("accessToken") && !session.has("refreshToken")) {
	// 	// return json({ redirectTo: "/login" }, { status: 401 });
	// 	throw redirect("/login");
	// }
	// // if it is exits, we need to get /me url to check if the token is valid
	// try {
	// 	await APIClientInstance.get("/auth/me", {
	// 		headers: { Authorization: `${session.get("accessToken")}` },
	// 	}).then(res => res.data);
	// } catch {
	// 	try {
	// 		const { accessToken, refreshToken } = await APIClientInstance.get("/auth/refresh", {
	// 			headers: { Authorization: `${session.get("refreshToken")}` },
	// 		}).then(res => res.data);

	// 		// set new access token and refresh token
	// 		session.set("accessToken", accessToken);
	// 		session.set("refreshToken", refreshToken);
	// 	} catch {
	// 		throw redirect("/login");
	// 	}
	// }

	return json({
		config,
	});
};

export default () => <UpdateBuyNowPrice />;
