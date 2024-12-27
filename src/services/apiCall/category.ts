import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { categoryEndPoints } from "../api";


// getAllCategory
export const fetchAllCategoryApi = async ()=>{
    let res = null;
    try {
        // apiCall
        const response = await apiConnector("POST",categoryEndPoints.FETCH_ALL_CATEGORY);

        // res
        res = response.data.data;

    } catch (error:any) {
        console.log(error);
        toast.error(error.reposnse.data.message);
    }
    return res;
}

// categoryPageDetails
export const categoryPageDetailsApi = async (categoryId:any)=>{
    let res = null;
    try {
        // apiCall
        const response = await apiConnector("POST",categoryEndPoints.CATEGORY_PAGE_DETAILS,{categoryId});
        // res
        res = response.data.data;

    } catch (error:any) {
        console.log(error);
        toast.error(error.reposnse.data.message);
    }
    return res;
}
