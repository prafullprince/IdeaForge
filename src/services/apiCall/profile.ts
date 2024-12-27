import { apiConnector } from '../apiConnector';
import { profileEndpoints } from '../api';
import toast from 'react-hot-toast';


// getUserDetails
export const userDetails = async (token:string)=>{
    let res = null;
    try {
        // apiCall
        const response = await apiConnector("POST",profileEndpoints.GET_USER_DETAILS,{},{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        
        // res
        res = response.data.userDetails;
        
    } catch (error:any) {
        console.log(error);
    }
    return res;
}

// profilePic
export const profilePicApi = async (token:string,profilePic:any)=>{
    const tid = toast.loading("Loading....");
    try {
        // apiCall
        const response = await apiConnector("POST",profileEndpoints.PROFILE_PIC,{profilePic},{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        // success res
        toast.success(response.data.message);
        
    } catch (error:any) {
        console.log(error);
    }
    toast.dismiss(tid);
}
