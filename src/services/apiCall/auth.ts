import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { authEndPoints } from "../api";
import { logOut, setToken, setUserImage } from "../../slices/authSlice";

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
  const tid = toast.loading("Loading...");
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
  toast.dismiss(tid);
};

// signup
export const signupApi = async (formData: signupDataType, navigate: any) => {
  const tid = toast.loading("Loading...");
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
  toast.dismiss(tid);
};

// login
export const loginApi = async (
  formData: signupDataType,
  navigate: any,
  dispatch: any
) => {
  const tid = toast.loading("Loading...");
  try {
    // apiCall
    const response = await apiConnector("POST", authEndPoints.LOGIN, formData);

    // save in store
    dispatch(setToken(response.data.user.token));
    dispatch(setUserImage(response.data.user.image));

    // save in localstorage
    localStorage.setItem("token", JSON.stringify(response.data.user.token));
    localStorage.setItem("image", JSON.stringify(response.data.user.image));

    // navigate to login
    navigate("/dashboard/profile");

    // success response
    toast.success(response.data.message);
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(tid);
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

// changePassword
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
    localStorage.removeItem("image");
    navigate("/login");
    toast.success("Logout successfull");
  } catch (error) {
    console.log(error);
    toast.error("Logout failed");
  }
  toast.dismiss(tid);
};
