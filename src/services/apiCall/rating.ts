import toast from "react-hot-toast";
import { ratingEndPoints } from "../api";
import { apiConnector } from "../apiConnector";


// createRating
export const createRatingApi = async (formData:any,token:string)=>{
    const tid = toast.loading("Loading....");
    try {
        // apiCall
        const response = await apiConnector("POST",ratingEndPoints.CREATE_RATING,formData,{
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${token}`
        });

        // success
        toast.success(response.data.message);
    } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(tid);
}

// avgRatings
export const avgRating = async (courseId:any)=>{
    try {
        // apiCall
        const response = await apiConnector("POST",ratingEndPoints.AVG_RATING,{courseId});

        // success
        return response.data.averageRating;
    } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}
