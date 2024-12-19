// import express and make router instances
import express from 'express';

// import controllers
import { auth, isInstructor } from '../controllers/middlewares';
import { createCategory, fetchAllCategory } from '../controllers/category';
import { createCourse, deleteCourse, editCourse, getInstructorCourse } from '../controllers/course';

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

// export router
export default router;
