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
}

// getUserDetailsById
export const userDetailsById = async (userId:any,token:string)=>{
    let res = null;
    try {
        // apiCall
        const response = await apiConnector("POST",profileEndpoints.GET_USER_BY_ID,{userId},{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        });
        
        // res
        res = response.data;
        
    } catch (error:any) {
        console.log(error);
    }
    return res;
}

// follow
export const followApi = async (toUser:any,token:string)=>{
    let res = null;
    try {
        // apiCall
        const response = await apiConnector("POST",profileEndpoints.CONNECTION,{toUser},{
            "Content-Type" : "multipart/form-data",
            Authorization: `Bearer ${token}`
        });
        
        // res
        res = response.data.key;
        
    } catch (error:any) {
        console.log(error);
    }
    return res;
}

// getOtherUsersCourses
export const otherUserCoursesApi = async (userId:any)=>{
    try {
        const response = await apiConnector("POST",profileEndpoints.GET_OTHER_COURSES,{userId});
        
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

// getLoggedUsersCourses
export const loggedUserCoursesApi = async (token:any)=>{
    try {
        const response = await apiConnector("POST",profileEndpoints.GET_LOGGED_USER_COURSES,{},{
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${token}`
        });
        return response.data.data.courses;
    } catch (error) {
        console.log(error);
    }
}
