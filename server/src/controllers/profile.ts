import { Request, Response } from 'express';
import { ErrorResponseHandling } from '../helper/EroorResponse';
import User from '../models/User';
import mongoose from 'mongoose';


// userDetails
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

    // if data available in cache then return success response if not first cache then return
    // const cachedValue = await client.get(`userDetails:${userId}`);
    // if(cachedValue){
    //   try {
    //     const userDetails = JSON.parse(cachedValue);
    //     return res.status(200).json({
    //       success: true,
    //       message: 'User details fetched successfully',
    //       userDetails,
    //     });
    //   } catch (parseError) {
    //     console.error('Error parsing cached value:', parseError);
    //     await client.del("userDetails");
    //   }
    // }

    // userDetails
    const userDetails:any = await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    })
      .select('name email accountType image')
      .populate({
        path: 'additionalDetails',
        select: 'gender dob about phone country',
      });

    // if data is freash then cached them
    // await client.set(`userDetails:${userId}`,JSON.stringify(userDetails));
    // await client.expire(`userDetails:${userId}`,10);

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
