import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { authEndPoints } from "../api";



// ********************************************************************************************************
//                                      Typescript types
// ********************************************************************************************************
// signup formDataTypes
interface signupDataType {
    name: string,
    email: string,
    accountType: string,
    password: string,
    confirmPassword: string,
    otp: string
}



// ********************************************************************************************************
//                                      Authentication apiCall
// ********************************************************************************************************
// sendOtp
export const sendOtpApi = async (email:string,navigate:any)=>{
    const tid = toast.loading("Loading...");
    try {
        // apiCall
        const response = await apiConnector("POST",authEndPoints.SEND_OTP,{email});

        // navigate to otp verification
        navigate("/verifyEmail");

        // success response
        toast.success(response.data.message);

    } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(tid);
}

// signup
export const signupApi = async (formData:signupDataType,navigate:any)=>{
    const tid = toast.loading("Loading...");
    try {
        // apiCall
        const response = await apiConnector("POST",authEndPoints.SIGNUP,formData);
        
        // navigate to login
        navigate("/login");

        // success response
        toast.success(response.data.message);

    } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(tid);
}

// login

// changePassword

// resetPasswordToken

// resetPassword
