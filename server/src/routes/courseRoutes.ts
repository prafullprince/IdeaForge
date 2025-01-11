// import express and make router instances
import express from 'express';

// import controllers
import { auth, isInstructor, isStudent } from '../controllers/middlewares';
import { categoryPageDetails, createCategory, fetchAllCategory } from '../controllers/category';
import { coursePageDetails, courseViewPageDetails, createCourse, createSection, createSubSection, deleteCourse, deleteSection, deleteSubSection, editCourse, editSection, editSubSection, getCourseContent, getInstructorCourse, markVideoAsCompleted, publishCourse, studentEnrolledCourses } from '../controllers/course';
import { capturePayment, verifyPayment } from '../controllers/payments';
import { searchCourse, searchResults, totalViews } from '../controllers/extra';
import { createRating, getAverageRating } from '../controllers/Rating';
import { allNotifications, allUnreadNotifications, markNotificationAsRead } from '../controllers/notifications';
import { createChat, fetchChat } from '../controllers/chat';

// router instances
const router = express.Router();

// category routes
router.post("/createCategory",auth,isInstructor,createCategory);
router.get("/getAllCategory",fetchAllCategory);
router.post("/categoryPageDetails",categoryPageDetails);

// course routes
router.post("/createCourse",auth,isInstructor,createCourse);
router.post("/editCourse",auth,isInstructor,editCourse);
router.post("/deleteCourse",auth,isInstructor,deleteCourse);
router.post("/getInstructorCourse",auth,isInstructor,getInstructorCourse);
router.post("/publishCourse",auth,isInstructor,publishCourse);
router.post("/coursePageDetails",coursePageDetails);
router.post("/markVideoAsCompleted",auth,isStudent,markVideoAsCompleted);
router.post("/studentEnrolledCourses",auth,isStudent,studentEnrolledCourses);
router.post("/courseViewPageDetails",auth,isStudent,courseViewPageDetails);

// section routes
router.post("/createSection",auth,isInstructor,createSection);
router.post("/editSection",auth,isInstructor,editSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);

// courseContent
router.post("/getAllContent",getCourseContent);

// subSection routes
router.post("/createSubSection",auth,isInstructor,createSubSection);
router.post("/editSubSection",auth,isInstructor,editSubSection);
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);

// buy
router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifyPayment",auth,isStudent,verifyPayment);

// rating
router.post("/createRating",auth,createRating);
router.post("/getAverageRating",getAverageRating);

// extra
router.post("/searchCourse",searchCourse);
router.post("/totalViews",totalViews);
router.post("/notifications",auth,allUnreadNotifications);
router.post("/markAsReadNot",auth,markNotificationAsRead);
router.post("/allNotifications",auth,allNotifications);
router.post("/searchResult",searchResults);

// chat
router.post("/createChat",auth,createChat);
router.post("/fetchChat",auth,fetchChat);

// export router
export default router;
