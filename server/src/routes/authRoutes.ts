// import express and make router instances
import express from 'express';

// import controllers
import { changePassword, login, resetPassword, resetPasswordToken, sendOtp, signup } from '../controllers/auth';
import { auth } from '../controllers/middlewares';

// router instances
const router = express.Router();

// routes
router.post('/sendotp', sendOtp);
router.post('/signup',signup);
router.post('/login',login);
router.post('/changePassword',auth,changePassword);
router.post("/resetPasswordToken",resetPasswordToken);
router.post("/resetPassword",resetPassword);

// export router
export default router;
