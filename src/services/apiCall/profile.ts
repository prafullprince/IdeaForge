import { apiConnector } from '../apiConnector';
import { profileEndpoints } from '../api';


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
