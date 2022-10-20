import axios from "axios";
import { getTokens } from "./getTokens";

export const APIClientInstance =
	typeof window === "undefined"
		? axios.create({
				baseURL: config.BACKEND_URL,
		  })
		: axios.create({
				baseURL: config.BACKEND_URL,
				headers: { Authorization: `Bearer ${getTokens().accessToken}` },
		  });

export const ParibuAPIClient = axios.create({
	baseURL: "https://www.paribu.com",
});
