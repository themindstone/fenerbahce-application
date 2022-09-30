import axios from "axios";

export const APIClientInstance = axios.create({
	baseURL: config.BACKEND_URL,
});

export const ParibuAPIClient = axios.create({
	baseURL: "https://www.paribu.com"
});