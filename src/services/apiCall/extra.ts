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

// seacrResultsApi
export const searchResultsApi = async (query:any,page:any)=>{
    try {
        const response = await apiConnector("POST",extraEndPoints.SEARCH_RESULT,{query,page});

        console.log(response);
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

// notification
export const allNotificationsApi = async (token:string)=>{
    try {
        const response = await apiConnector("POST",extraEndPoints.NOTIFICATION,{},{
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${token}`
        });

        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

// mark as read notification
export const markAsReadNotificationApi = async (token:string)=>{
    try {
        const response = await apiConnector("POST",extraEndPoints.MARK_AS_READ,{},{
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${token}`
        });

        console.log(response)
    } catch (error) {
        console.log(error);
    }
}

// mark as read notification
export const allUserNotificationsApi = async (token:string)=>{
    try {
        const response = await apiConnector("POST",extraEndPoints.ALL_NOTIFICATION,{},{
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${token}`
        });

        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}
