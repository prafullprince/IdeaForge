// baseUrl
const BASE_URL = "https://studyforge-h0z2.onrender.com/api/v1";


// "http://localhost:4000/api/v1"
// "https://study-hub-2.onrender.com/api/v1"

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
export const courseEndPoints = {
    CREATE_COURSE: BASE_URL + "/course/createCourse",
    EDIT_COURSE: BASE_URL + "/course/editCourse",
    DELETE_COURSE: BASE_URL + "/course/deleteCourse",
    INSTRUCTOR_COURSES: BASE_URL + "/course/getInstructorCourse",
    PUBLISH_COURSE: BASE_URL + "/course/publishCourse",
    COURSE_PAGE_DETAILS: BASE_URL + "/course/coursePageDetails",
    CATURE_PAYMENT: BASE_URL + "/course/capturePayment",
    VERIFY_PAYMENT: BASE_URL + "/course/verifyPayment",
    ENROLLED_COURSE: BASE_URL + "/course/studentEnrolledCourses",
    COURSE_VIEW_PAGE_DETAILS: BASE_URL + "/course/courseViewPageDetails"
}

// section
export const sectionEndPoints = {
    CREATE_SECTION: BASE_URL + "/course/createSection",
    EDIT_SECTION: BASE_URL + "/course/editSection",
    DELETE_SECTION: BASE_URL + "/course/deleteSection",
    COURSE_CONTENT: BASE_URL + "/course/getAllContent"
}

// subSection
export const subSectionEndPoints = {
    CREATE_SUBSECTION: BASE_URL + "/course/createSubSection",
    EDIT_SUBSECTION: BASE_URL + "/course/editSubSection",
    DELETE_SUBSECTION: BASE_URL + "/course/deleteSubSection"
}

// extra
export const extraEndPoints = {
    SEARCH_COURSE: BASE_URL + "/course/searchCourse",
    VIEWS: BASE_URL + "/course/totalViews",
    NOTIFICATION: BASE_URL + "/course/notifications",
    MARK_AS_READ: BASE_URL + "/course/markAsReadNot",
    ALL_NOTIFICATION: BASE_URL + "/course/allNotifications",
    SEARCH_RESULT: BASE_URL + "/course/searchResult"
}

// rating
export const ratingEndPoints = {
    CREATE_RATING: BASE_URL + "/course/createRating",
    AVG_RATING: BASE_URL + "/course/getAverageRating"
}

// profile
export const profileEndpoints = {
    GET_USER_DETAILS: BASE_URL + "/auth/getUserDetails",
    PROFILE_PIC: BASE_URL + "/auth/uploadPic",
    GET_USER_BY_ID: BASE_URL + "/auth/getUserDetailsByUserId",
    CONNECTION: BASE_URL + "/auth/follow",
    GET_OTHER_COURSES: BASE_URL + "/auth/getUserCourses",
    GET_LOGGED_USER_COURSES: BASE_URL + "/auth/getLoggedUserCourses"
}

// category
export const categoryEndPoints = {
    FETCH_ALL_CATEGORY: BASE_URL + "/course/getAllCategory",
    CATEGORY_PAGE_DETAILS: BASE_URL + "/course/categoryPageDetails"
}

// chat
export const chatEndPoints = {
    CREATE_CHAT: BASE_URL + "/course/createChat",
    FETCH_CHAT: BASE_URL + "/course/fetchChat"
}
