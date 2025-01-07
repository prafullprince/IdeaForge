import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { chatEndPoints } from "../api";

// createChat
export const createChat = async (user1:any,user2:any,token:string)=>{
    const tid = toast.loading("Loading....");
    try {
        // apiCall
        const response = await apiConnector("POST",chatEndPoints.CREATE_CHAT,{user1,user2},{
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

// fetchAllChat
export const fetchAllChat = async (token:string)=>{
    let res = null;
    try {
        // apiCall
        const response = await apiConnector("POST",chatEndPoints.FETCH_CHAT,{},{
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${token}`
        });

        // success

        res = response.data.data;

    } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
    }
    return res;
}

