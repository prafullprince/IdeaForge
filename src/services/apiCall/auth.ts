import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { authEndPoints } from "../api";
import { logOut, setToken } from "../../slices/authSlice";

// signup formDataTypes
interface signupDataType {
  name: string;
  email: string;
  accountType: string;
  password: string;
  confirmPassword: string;
  otp: string;
}

// ********************************************************************************************************
//                                      Authentication apiCall
// ********************************************************************************************************

// sendOtp
export const sendOtpApi = async (email: string, navigate: any) => {
  try {
    // apiCall
    const response = await apiConnector("POST", authEndPoints.SEND_OTP, {
      email,
    });

    // navigate to otp verification
    navigate("/verifyEmail");

    // success response
    toast.success(response.data.message);
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

// signup
export const signupApi = async (formData: signupDataType, navigate: any) => {
  try {
    // apiCall
    const response = await apiConnector("POST", authEndPoints.SIGNUP, formData);

    // navigate to login
    navigate("/login");

    // success response
    toast.success(response.data.message);
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

// login
export const loginApi = async (
  formData: signupDataType,
  navigate: any,
  dispatch: any
) => {
  try {
    // apiCall
    const response = await apiConnector("POST", authEndPoints.LOGIN, formData);

    // save in store
    dispatch(setToken(response.data.user.token));
    // dispatch(setUserImage(response.data.user.image));
    // dispatch(setUser(response.data.user));

    // save in localstorage
    localStorage.setItem("token", JSON.stringify(response.data.user.token));
    // localStorage.setItem("image", JSON.stringify(response.data.user.image));
    // localStorage.setItem("user",JSON.stringify(response.data.user));

    // navigate to login
    navigate("/dashboard/profile");

    // success response
    toast.success(response.data.message);
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};

// resetPasswordToken
export const resetPasswordTokenApi = async (email: string) => {
  const tid = toast.loading("Loading...");
  try {
    // apiCall
    const response = await apiConnector(
      "POST",
      authEndPoints.RESET_PASSWORD_TOKEN,
      { email }
    );

    // success response
    toast.success(response.data.message);
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(tid);
};

// resetPassword
export const resetPasswordApi = async (formData: any, navigate: any) => {
  const tid = toast.loading("Loading...");
  try {
    // apiCall
    const response = await apiConnector(
      "POST",
      authEndPoints.RESET_PASSWORD,
      formData
    );

    // navigate to login
    navigate("/login");

    // success response
    toast.success(response.data.message);
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(tid);
};

// changePassword - TODO: token valid
export const changePasswordApi = async (formData: any) => {
  const tid = toast.loading("Loading...");
  try {
    // apiCall
    const response = await apiConnector(
      "POST",
      authEndPoints.CHANGE_PASSWORD,
      formData
    );

    // success response
    toast.success(response.data.message);
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(tid);
};

// logout
export const logout = (dispatch: any, navigate: any) => {
  const tid = toast.loading("Loading...");
  try {
    dispatch(logOut());
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout successfull");
  } catch (error) {
    console.log(error);
    toast.error("Logout failed");
  }
  toast.dismiss(tid);
};
