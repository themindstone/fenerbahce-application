import axios from "axios";
import { config } from "~/configs";

export const BFFClient = axios.create({
    baseURL: config.BACKEND_URL
});
