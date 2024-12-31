import { Request, Response } from 'express';
import { ErrorResponseHandling } from '../helper/EroorResponse';
import User from '../models/User';
import mongoose from 'mongoose';
import client from '../config/redis';
import { uploadMediaToCloudinary } from '../helper/UploadMedia';

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
    const cachedValue = await client.get(`userDetails:${userId}`);
    if (cachedValue) {
      try {
        const userDetails = JSON.parse(cachedValue);
        return res.status(200).json({
          success: true,
          message: 'User details fetched successfully',
          userDetails,
        });
      } catch (parseError) {
        console.error('Error parsing cached value:', parseError);
        await client.del(`userDetails:${userId}`);
      }
    }

    // userDetails
    const userDetails: any = await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    })
      .select('name email accountType image')
      .populate({
        path: 'additionalDetails',
        select: 'gender dob about phone country',
      })
      .populate({
        path: 'following',
        select: 'name email image',
      })
      .populate({
        path: 'followers',
        select: 'name email image',
      })
      .lean();

    // if data is freash then cached them
    await client.set(`userDetails:${userId}`, JSON.stringify(userDetails));
    await client.expire(`userDetails:${userId}`, 30);

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

// updateProfilePic
export const updateProfilePic = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const userId = req.user?.id;
    const profilePic = req.files?.profilePic;

    // validation
    if (!userId || !profilePic) {
      return ErrorResponseHandling(res, 400, 'Invalid credentials');
    }

    // user
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return ErrorResponseHandling(res, 400, 'User not found');
    }

    // uploadFile
    const uploadFile = await uploadMediaToCloudinary(
      profilePic,
      process.env.FOLDER_NAME!,
      200,
      200,
    );
    if (!uploadFile) {
      return ErrorResponseHandling(res, 400, 'Image upload failed');
    }

    // save in db
    user.image = uploadFile.secure_url;
    await user.save();

    // return res
    return res.status(200).json({
      success: true,
      message: 'Profile pic updated',
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// userDetailsByUserID -> others user
export const getUserDetailsByUserId = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const { userId } = req.body;
    const loggedId = req.user?.id;

    // validation
    if (!userId || !loggedId) {
      return ErrorResponseHandling(res, 400, 'Invalid credentials');
    }

    // if data available in cache then return success response if not first cache then return
    // const cachedValue = await client.get(`userDetailsId:${userId}`);
    // if (cachedValue) {
    //   try {
    //     const userDetails = JSON.parse(cachedValue);
    //     return res.status(200).json({
    //       success: true,
    //       message: 'User details fetched successfully',
    //       userDetails,
    //     });
    //   } catch (parseError) {
    //     console.error('Error parsing cached value:', parseError);
    //     await client.del(`userDetailsId:${userId}`);
    //   }
    // }

    // userDetails

    const userDetails: any = await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    })
      .select('name email accountType image')
      .populate({
        path: 'additionalDetails',
        select: 'gender dob about phone country',
      })
      .populate({
        path: 'following',
        select: 'name email image',
      })
      .populate({
        path: 'followers',
        select: 'name email image',
      })
      .lean();

    // validation
    if (!userDetails) {
      return ErrorResponseHandling(res, 400, 'Invalid User');
    }

    // follow status
    const data = userDetails.followers.some((follower: any) =>
      follower._id.equals(loggedId),
    );
    console.log(data);
    console.log(userDetails.followers);
    // if data is freash then cached them
    // await client.set(`userDetailsId:${userId}`, JSON.stringify(userDetails));
    // await client.expire(`userDetailsId:${userId}`, 1);

    // return res

    return res.status(200).json({
      success: true,
      message: 'User details fetched successfully',
      userDetails,
      data,
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// userById courses -> other users
export const getUserCoursesByUserId = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const { userId } = req.body;

    // validation
    if (!userId) {
      return ErrorResponseHandling(res, 400, 'Invalid credentials');
    }

    // if data available in cache then return success response if not first cache then return
    const cachedValue = await client.get(`userIdCourses:${userId}`);
    if (cachedValue) {
      try {
        const data = JSON.parse(cachedValue);
        return res.status(200).json({
          success: true,
          message: 'User details fetched successfully',
          data,
        });
      } catch (parseError) {
        console.error('Error parsing cached value:', parseError);
        await client.del(`userIdCourses:${userId}`);
      }
    }

    // userDetails
    const userDetails: any = await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    })
      .select("")
      .populate({
        path:"courses",
        select:"courseName thumbnail courseDesc status",
        populate:{
          path:"instructor",
          select:"name image followers following courses"
        }
      })
      .lean();

    // validation
    if (!userDetails) {
      return ErrorResponseHandling(res, 400, 'Invalid User');
    }

    const data = userDetails.courses.filter((course:any) => course.status === "Published");

    // if data is freash then cached them
    await client.set(`userIdCourses:${userId}`, JSON.stringify(data));
    await client.expire(`userIdCourses:${userId}`, 40);

    // return res
    return res.status(200).json({
      success: true,
      message: 'User courses fetched successfully',
      data
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// userCourses -> logged
export const getUserCourses = async (
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
    const cachedValue = await client.get(`userCoursesLogged:${userId}`);
    if (cachedValue) {
      try {
        const data = JSON.parse(cachedValue);
        return res.status(200).json({
          success: true,
          message: 'User courses fetched successfully',
          data,
        });
      } catch (parseError) {
        console.error('Error parsing cached value:', parseError);
        await client.del(`userCoursesLogged:${userId}`);
      }
    }

    // userDetails
    const data: any = await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    })
      .select("name")
      .populate({
        path: 'courses',
        select: 'courseName courseDesc thumbnail',
        populate:{
          path:"instructor",
          select:"name image courses following followers"
        }
      })
      .lean();

    // if data is fresh then cached them
    await client.set(`userCoursesLogged:${userId}`, JSON.stringify(data));
    await client.expire(`userCoursesLogged:${userId}`, 30);

    // return res
    return res.status(200).json({
      success: true,
      message: 'User courses fetched successfully',
      data,
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};
