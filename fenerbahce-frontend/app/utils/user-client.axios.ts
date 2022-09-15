import { useLoaderData } from "@remix-run/react"
import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";


export const useClientInstance = (): AxiosInstance => {
    const { config } = useLoaderData();

    const Client = useMemo(() => axios.create({
        baseURL: config.BACKEND_URL
    }), []);


    return Client;
};

