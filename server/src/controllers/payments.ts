import { Request, Response } from 'express';
import Course from '../models/Course';
import mongoose from 'mongoose';
import { instance } from '../config/instances';
import crypto from 'crypto';
import User from '../models/User';

// capture-payment
export const capturePayment = async (req: Request, res: Response): Promise<any> => {
  try {
    // fetch data
    const { courseId } = req.body;
    const userId = req.user?.id;

    // validation
    if (!courseId || !userId) {
      return res.status(500).json({
        success: false,
        message: 'fill all details',
      });
    }

    // calculate total amount of present courses
    let totalAmount = 0;
    let course;
    try {
      course = await Course.findById(courseId);
      if (!course) {
        return res.status(500).json({
          success: false,
          message: 'course not found',
        });
      }

      // check isAlready user buy/not this course
      const uoid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnroled.includes(uoid)) {
        return res.status(500).json({
          success: false,
          message: 'already buy',
        });
      }

      totalAmount = totalAmount + course.price;
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'total amount not calculated',
      });
    }

    // now create order
    const options = {
      amount: totalAmount * 100,
      currency: 'INR',
      receipt: Date.now().toString(),
      payment_capture: 1,
    };

    const paymentResponse = await instance.orders.create(options);

    console.log('paymentResponse', paymentResponse);
    return res.json({
      success: true,
      message: 'order created',
      paymentResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'internal server problem during payment capturing',
    });
  }
};

// verify-payment
export const verifyPayment = async (req: Request, res: Response): Promise<any> => {
  try {
    // fetch data
    const userId = req.user?.id;
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courseId = req.body?.courseId;

    // validation
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courseId ||
      !userId
    ) {
      return res.status(500).json({
        success: false,
        message: 'please fill all the details in verifying payments',
      });
    }

    // make signature for client
    let body = razorpay_order_id + '|' + razorpay_payment_id;
    let expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(500).json({
        success: false,
        message: 'signature not verified',
      });
    }

    // if matched then enrolled student in course
    await enrollStudent(courseId, userId, res);

    // ret res
    return res.status(200).json({
      success: true,
      message: 'payment verified',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'internal server problem during payment verifying',
    });
  }
};

// function to enrollStudents
const enrollStudent = async (courseId: any, userId: any, res: any) => {
  try {
    // validation
    if (!courseId || !userId) {
      return res.status(500).json({
        success: false,
        message: 'internal server problem during payment capturing',
      });
    }

    // add student in courses which they buy
    const enrolledCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      { $push: { studentsEnroled: userId } },
      { new: true },
    );
    if (!enrolledCourse) {
      return res.status(500).json({
        success: false,
        message: 'enroll failed',
      });
    }

    // add course in User courses field
    let enrolledStudent = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { courses: courseId } },
      { new: true },
    );
    console.log(enrolledStudent);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'internal server problem durin payment capturing',
    });
  }
};
