import axios from "axios";

const backendUrl = process.env.BACKEND_URL as string;

export const Client = axios.create({
    baseURL: backendUrl
});
