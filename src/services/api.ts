// baseUrl
const BASE_URL = "https://studyforge.onrender.com/api/v1";

// https://studyforge.onrender.com/api/v1

// auth
export const authEndPoints = {
    SIGNUP: BASE_URL + "/auth/signup",
    LOGIN: BASE_URL + "/auth/login",
    SEND_OTP: BASE_URL + "/auth/sendotp",
    CHANGE_PASSWORD: BASE_URL + "/auth/changePassword",
    RESET_PASSWORD_TOKEN: BASE_URL + "/auth/resetPasswordToken",
    RESET_PASSWORD: BASE_URL + "/auth/resetPassword"
}

// course


// section


// subSection


// extra


// category
export const categoryEndPoints = {
    FETCH_ALL_CATEGORY: BASE_URL + "/course/getAllCategory"
}
