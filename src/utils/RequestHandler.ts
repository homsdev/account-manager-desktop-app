import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {APIResponse} from "../types/APIResponse";

function okInterceptor(response: AxiosResponse<APIResponse>) {
    return response;
}

function errorInterceptor(response: AxiosResponse<APIResponse>) {
    console.info("Executing Error Interceptor");
    console.error(response);
    return Promise.reject(new Error("Something went wrong"));
}

function preSendingInterceptor(config: InternalAxiosRequestConfig) {
    console.info("Sending request to", config.url);
    console.log("Request payload");
    console.log(config.data);
    return config;
}

export const requestHandler = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: "http://localhost:8080",
    })

    instance.interceptors.request.use(preSendingInterceptor);
    instance.interceptors.response.use(okInterceptor, errorInterceptor);

    return instance;
}