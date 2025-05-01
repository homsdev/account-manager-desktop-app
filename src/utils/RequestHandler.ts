import axios, {AxiosInstance, AxiosResponse} from "axios";
import {APIResponse} from "../types/APIResponse";

function okInterceptor(response: AxiosResponse<APIResponse>) {
    return response;
}

function errorInterceptor(response: AxiosResponse<APIResponse>) {
    console.info("Executing Error Interceptor");
    return Promise.reject(response);
}

export const requestHandler = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: "http://localhost:8080",
    })

    instance.interceptors.response.use(okInterceptor, errorInterceptor);

    return instance;
}