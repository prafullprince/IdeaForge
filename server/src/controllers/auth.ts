import { Request, Response } from 'express';
import User from '../models/User';
import otpGenerator from 'otp-generator';
import Otp from '../models/OTP';
import bcrypt from 'bcryptjs';
import Profile from '../models/Profile';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import { sendEmail } from '../helper/sendSMS';
import { ErrorResponseHandling } from '../helper/EroorResponse';
import crypto from "crypto";
configDotenv();


// sendOtp
export const sendOtp = async (req: Request, res: Response): Promise<any> => {
  try {
    // fetch data
    const { email } = req.body;

    // validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all the details',
      });
    }

    // check isUser Already Registered
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'This email already registered with us',
      });
    }

    // make otp
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    console.time('sa');
    // save otp in db
    await Otp.create({ email, otp });
    console.timeEnd('sa');

    // return res
    return res.status(200).json({
      success: true,
      message: 'Otp sent successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// signup
export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    // fetch data
    const { name, email, password, confirmPassword, accountType, otp } =
      req.body;

    // Check if All Details are there or not
    if (
      !name ||
      !accountType ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).send({
        success: false,
        message: 'All Fields are required',
      });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          'Password and Confirm Password do not match. Please try again.',
      });
    }

    // Check if user already exists, Find the most recent OTP for the email
    const [existingUser, response] = await Promise.all([
      User.findOne({ email }),
      Otp.findOne({ email }).sort({ createdAt: -1 }),
    ]);

    // validation
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists. Please sign in to continue.',
      });
    }
    if (!response) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: 'Resend otp,previous one is expire',
      });
    }
    if (otp !== response.otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: 'The OTP is not valid',
      });
    }

    // Hash the password, profileDetails
    const [hashedPassword, profileDetails] = await Promise.all([
      bcrypt.hash(password, 10),
      Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
      }),
    ]);

    // upload default profilePic
    const profilePic = `https://api.dicebear.com/5.x/initials/svg?seed=${name.split(' ')[0]} ${name.split(' ')[1]}`;

    // save user in db
    const data = await User.create({
      name,
      email,
      password: hashedPassword,
      accountType: accountType,
      additionalDetails: profileDetails._id,
      image: profilePic,
    });

    return res.status(200).json({
      success: true,
      data,
      message: 'User registered successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// login
export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    // fetch data
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    // Find user
    const user = await User.findOne({ email })
      .populate('additionalDetails')
      .lean();

    // validation
    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, accountType: user.accountType },
        process.env.SECRET_KEY!,
        {
          expiresIn: '2h',
        },
      );

      // Save token to user document in database
      user.token = token;

      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie('token', token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// changePassword
export const changePassword = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const userId = req.user?.id;
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // validation
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res
        .status(400)
        .json({ success: false, message: 'Please fill all the details' });
    }

    // validation on password
    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ success: false, message: 'The password is not matched' });
    }

    // findUser
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password,
    );
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' });
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    userDetails.password = encryptedPassword;
    userDetails.save();

    // Return success response
    res
      .status(200)
      .json({ success: true, message: 'Password updated successfully' });

    // Send notification email
    try {
      await sendEmail(
        `${userDetails.email}`,
        'Password for your account has been updated',
        `Password updated successfully for ${userDetails.name}`,
      );
    } catch (error: unknown) {
      console.error('Error occurred while sending email:', error);
      return res.status(500).json({
        success: false,
        message: 'Error occurred while sending email',
      });
    }

    return;
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// resetPassword - createToken
export const resetPasswordToken = async (req:Request,res:Response): Promise<any> =>{
  try {

    // fetch data
    const { email } = req.body;

    // validation
    if(!email){
      return ErrorResponseHandling(res,400,"Emails are required");
    }

    // isUserExist
    const userDetails = await User.findOne({email});
    if(!userDetails){
      return ErrorResponseHandling(res,400,"User not found");
    }

    // createToken
    const token = crypto.randomBytes(20).toString("hex");

    // save in db
    userDetails.resetPasswordToken = token;
    userDetails.resetPasswordExpiry = new Date(Date.now() + 10*60*1000);
    userDetails.save();

    // frontend Url : resetPassword
    const url = `http://localhost:3000/updatePassword/${token}`;

    // response
    res.status(200).json({success:true,message:"Link sent on mail"});

    try {
      // sendMail
      await sendEmail(email,"Reset Link",`Link for reset password ${url}`);

    } catch (error) {
      console.log(error);
      return ErrorResponseHandling(res,500,"Email service problem");
    }

  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res,500,"Internal Server error");
  }
}

// resetPassword -> verifyToken and createPassword
export const resetPassword = async (req:Request,res:Response): Promise<any> => {
  try {

    // fetch token
    const { token,newPassword,confirmNewPassword } = req.body;

    // validation
    if(!token || !newPassword || !confirmNewPassword){
      return ErrorResponseHandling(res,400,"Token not found");
    }

    if(newPassword !== confirmNewPassword){
      return ErrorResponseHandling(res,404,"Password not matched with confirm password");
    }

    // findUser
    const userDetails = await User.findOne({resetPasswordToken:token});

    // validation
    if(!userDetails || userDetails.resetPasswordExpiry < new Date(Date.now())){
      return ErrorResponseHandling(res,400,"link expired");
    }

    // hashing
    const hashedPassword = await bcrypt.hash(newPassword,10);

    // updateDetails
    userDetails.password = hashedPassword;
    userDetails.save();

    return res.status(200).json({success:true,message:"Password updated"});

  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res,500,"Internal server error");
  }
}

// TODO: Direct login after clicking on link
