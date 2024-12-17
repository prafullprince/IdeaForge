import { Request, Response } from 'express';
import { ErrorResponseHandling } from '../helper/EroorResponse';
import User from '../models/User';
import mongoose from 'mongoose';

export const getUserDetails = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const userId = req.user?.id;

    // validation
    if (!userId) {
      return ErrorResponseHandling(res, 400, 'Invalid credentials');
    }

    // userDetails
    const userDetails = await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    })
      .select('name email accountType image')
      .populate({
        path: 'additionalDetails',
        select: 'gender dob about phone country',
      });

    // return res
    return res.status(200).json({
      success: true,
      message: 'User details fetched successfully',
      userDetails,
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};
