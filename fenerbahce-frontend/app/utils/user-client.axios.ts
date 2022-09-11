import { useLoaderData } from "@remix-run/react"
import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";


export const useUserClientInstance = (): AxiosInstance => {
    const { config } = useLoaderData();

    const UserClient = useMemo(() => axios.create({
        baseURL: config.BACKEND_URL
    }), []);


    return UserClient;
};

