import { extraEndPoints } from "../api";
import { apiConnector } from "../apiConnector";

// searchApiCall
export const searchApi = async (query:string)=>{
    try {
        const response = await apiConnector("POST",extraEndPoints.SEARCH_COURSE,{query});

        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

// totalViews
export const totalViewsApi = async (courseId:string)=>{
    try {
        const response = await apiConnector("POST",extraEndPoints.VIEWS,{courseId});

        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}
