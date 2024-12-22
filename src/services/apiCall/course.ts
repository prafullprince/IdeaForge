import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { courseEndPoints, sectionEndPoints, subSectionEndPoints } from "../api";
import { setCourse, setStep } from "../../slices/courseSlice";


// createCourse
export const createCourseApi = async (formData:any,token:string,dispatch:any)=>{
    const tid = toast.loading("Loading....");
    try {
        // apiCall
        const response = await apiConnector("POST",courseEndPoints.CREATE_COURSE,formData,{
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${token}`
        });

        // setStep,setCourse
        dispatch(setCourse(response.data.data));
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
export const instructorCoursesApi = async (token:string,page:any,limit:any,status:any)=>{
    let res = null;
    try {
        // apiCall
        const response = await apiConnector("POST",courseEndPoints.INSTRUCTOR_COURSES,{page,limit,status},{
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${token}`
        });
        console.log(response.data)
        res = response.data.pagination;

    } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
    }
    return res;
}

// deleteCourse
export const deleteCourseApi = async (formData:any,token:string)=>{
    const tid = toast.loading("Loading....");
    try {
        // apiCall
        const response = await apiConnector("POST",courseEndPoints.DELETE_COURSE,formData,{
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

// editCourse
export const editCourseApi = async (formData:any,token:string,dispatch:any)=>{
    const tid = toast.loading("Loading....");
    try {
        // apiCall
        const response = await apiConnector("POST",courseEndPoints.EDIT_COURSE,formData,{
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${token}`
        });

        // setStep
        dispatch(setStep(2));
        dispatch(setCourse(response.data.data));

        // success
        toast.success(response.data.message);
    } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(tid);
}

// createSection
export const createSectionApi = async (formData:any,token:string)=>{
    const tid = toast.loading("Loading....");
    try {
        // apiCall
        const response = await apiConnector("POST",sectionEndPoints.CREATE_SECTION,formData,{
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

// editSection
export const editSectionApi = async (formData:any,token:string)=>{
    const tid = toast.loading("Loading....");
    try {
        // apiCall
        const response = await apiConnector("POST",sectionEndPoints.EDIT_SECTION,formData,{
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

// deleteSection
export const deleteSectionApi = async (formData:any,token:string)=>{
    const tid = toast.loading("Loading....");
    try {
        // apiCall
        const response = await apiConnector("POST",sectionEndPoints.DELETE_SECTION,formData,{
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

// getAllCourseContent during creating
export const getCourseContentApi = async (courseId:any)=>{
    let res = null;
    try {
        // apiCall
        const response = await apiConnector("POST",sectionEndPoints.COURSE_CONTENT,{courseId});

        // res
        res = response.data.data.sections;

    } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
    }
    return res;
}

// createSubSection
export const createSubSectionApi = async (formData:any,token:string)=>{
    const tid = toast.loading("Loading....");
    try {
        // apiCall
        const response = await apiConnector("POST",subSectionEndPoints.CREATE_SUBSECTION,formData,{
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

// editSubSection
export const editSubSectionApi = async (formData:any,token:string)=>{
    const tid = toast.loading("Loading....");
    try {
        // apiCall
        const response = await apiConnector("POST",subSectionEndPoints.EDIT_SUBSECTION,formData,{
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

// deleteSubSection
export const deleteSubSectionApi = async (formData:any,token:string)=>{
    const tid = toast.loading("Loading....");
    try {
        // apiCall
        const response = await apiConnector("POST",subSectionEndPoints.DELETE_SUBSECTION,formData,{
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

// publishCourse
export const publishCourseApi = async (formData:any,token:string)=>{
    const tid = toast.loading("Loading....");
    try {
        // apiCall
        const response = await apiConnector("POST",courseEndPoints.PUBLISH_COURSE,formData,{
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
