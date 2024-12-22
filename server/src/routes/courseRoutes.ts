// import express and make router instances
import express from 'express';

// import controllers
import { auth, isInstructor } from '../controllers/middlewares';
import { createCategory, fetchAllCategory } from '../controllers/category';
import { createCourse, createSection, createSubSection, deleteCourse, deleteSection, deleteSubSection, editCourse, editSection, editSubSection, getCourseContent, getInstructorCourse, publishCourse } from '../controllers/course';

// router instances
const router = express.Router();

// category routes
router.post("/createCategory",auth,isInstructor,createCategory);
router.post("/getAllCategory",fetchAllCategory);

// course routes
router.post("/createCourse",auth,isInstructor,createCourse);
router.post("/editCourse",auth,isInstructor,editCourse);
router.post("/deleteCourse",auth,isInstructor,deleteCourse);
router.post("/getInstructorCourse",auth,isInstructor,getInstructorCourse);
router.post("/publishCourse",auth,isInstructor,publishCourse);

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

// export router
export default router;
