import { Request, Response } from 'express';
import User from '../models/User';
import Course from '../models/Course';
import Rating from '../models/Rating';
import mongoose from 'mongoose';

// create rating
export const createRating = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const userId = req.user?.id;
    const { reviews, rating, courseId } = req.body;

    // validation
    if (!reviews || !rating || !courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all the details',
      });
    }

    // validate user,blog
    const [user, course] = await Promise.all([
      User.findById(userId),
      Course.findById(courseId),
    ]);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }
    if (!course) {
      return res.status(400).json({
        success: false,
        message: 'Blog not found',
      });
    }

    // save entry in db
    const data = await Rating.create({
      user: user._id,
      blog: course._id,
      reviews: reviews,
      rating: rating,
    });

    // updatedBlog
    await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratings: data._id,
        },
      },
      { new: true },
    );

    // return res
    return res.status(200).json({
      success: 'true',
      message: 'Rating Created',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


// Get the average rating for a course
export const getAverageRating = async (req: Request, res:Response): Promise<any> => {
  try {
    const courseId = req.body.courseId

    // Calculate the average rating using the MongoDB aggregation pipeline
    const result = await Rating.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId), // Convert courseId to ObjectId
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ])

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      })
    }

    // If no ratings are found, return 0 as the default rating
    return res.status(200).json({ success: true, averageRating: 0 })
  } catch (error:any) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating for the course",
      error: error.message,
    })
  }
}
