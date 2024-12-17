import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { profileEndpoints } from '../api';


// getUserDetails
export const userDetails = async (token:string)=>{
    try {
        // apiCall
        const data = await apiConnector("POST",profileEndpoints.GET_USER_DETAILS,{},{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log(data);
        
    } catch (error:any) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}
