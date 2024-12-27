// import express and make router instances
import express from 'express';

// import controllers
import { changePassword, login, resetPassword, resetPasswordToken, sendOtp, signup } from '../controllers/auth';
import { auth } from '../controllers/middlewares';
import { getUserDetails, updateProfilePic } from '../controllers/profile';
import { follow } from '../controllers/connection';

// router instances
const router = express.Router();

// auth routes
router.post('/sendotp', sendOtp);
router.post('/signup',signup);
router.post('/login',login);
router.post('/changePassword',auth,changePassword);
router.post("/resetPasswordToken",resetPasswordToken);
router.post("/resetPassword",resetPassword);

// profile routes
router.post("/getUserDetails",auth,getUserDetails);
router.post("/uploadPic",auth,updateProfilePic);

// connection routes
router.post("/follow",auth,follow);

// export router
export default router;
