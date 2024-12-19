import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndPoints } from "../api";
import { setStep } from "../../slices/courseSlice";


// createCourse
export const createCourseApi = async (formData:any,token:string,dispatch:any)=>{
    const tid = toast.loading("Loading....");
    try {
        // apiCall
        const response = await apiConnector("POST",courseEndPoints.CREATE_COURSE,formData,{
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${token}`
        });

        // setStep
        dispatch(setStep(2));

        // success
        toast.success(response.data.message);
    } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(tid);
}


// instructorCourse
export const instructorCoursesApi = async (token:string)=>{
    let res = null;
    try {
        // apiCall
        const response = await apiConnector("POST",courseEndPoints.INSTRUCTOR_COURSES,{},{
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${token}`
        });
        res = response.data.data.courses;

    } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
    }
    return res;
}
