import axios, { AxiosRequestConfig, Method } from "axios";

// making axiosInstance
export const axiosInstance = axios.create({});

// apiConnectorTypes
// interface apiConnectorParams {
//     method: Method,
//     url: string,
//     bodyData?: Record<string, any>; // Optional body data for POST/PUT requests
//     headers?: Record<string, string>; // Optional headers
//     params?: Record<string, any>; // Optional query parameters
// }

// apiConnector
export const apiConnector = (method:Method,url:string,bodyData:Record<string,any>,headers?:Record<string,string>,params?:Record<string,any>)=> {
    const config: AxiosRequestConfig = {
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : undefined,
        params: params ? params : null
    }
    return axiosInstance(config)
}
