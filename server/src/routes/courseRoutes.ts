// import express and make router instances
import express from 'express';

// import controllers
import { auth, isInstructor } from '../controllers/middlewares';
import { createCategory, fetchAllCategory } from '../controllers/category';

// router instances
const router = express.Router();

// routes
router.post("/createCategory",auth,isInstructor,createCategory);
router.post("/getAllCategory",fetchAllCategory);

// export router
export default router;
