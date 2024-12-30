import { extraEndPoints } from "../api";
import { apiConnector } from "../apiConnector";


export const searchApi = async (query:string)=>{
    try {
        const response = await apiConnector("POST",extraEndPoints.SEARCH_COURSE,{query});

        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}
