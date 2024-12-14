import axios from "axios";

// making axiosInstance
export const axiosInstance = axios.create({});

// apiConnector
export const apiConnector = (method,url,bodyData,headers,params)=> {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null
    })
}
