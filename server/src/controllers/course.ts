import { Request, response, Response } from 'express';
import { ErrorResponseHandling } from '../helper/EroorResponse';
import Category, { ICategory } from '../models/Category';
import User from '../models/User';
import { uploadMediaToCloudinary } from '../helper/UploadMedia';
import Course, { ICourse } from '../models/Course';
import { UploadedFile } from 'express-fileupload';

// createCourse
export const createCourse = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    let {
      courseName,
      courseDesc,
      category,
      tags,
      benefits,
      requirements,
      status,
    } = req.body;
    const thumbnail = req.files?.thumbnail as UploadedFile;
    const userId = req.user?.id;
    const price = parseInt(req.body.price);

    // validation
    const fileSizeInMb = thumbnail?.size / (1024 * 1024);
    if (fileSizeInMb > 1 ) {
      return ErrorResponseHandling(res, 400, 'Image should be under 1mb');
    }

    // validation
    if (
      !courseName ||
      !courseDesc ||
      !price ||
      !category ||
      !tags ||
      !benefits ||
      !requirements ||
      !thumbnail
    ) {
      return ErrorResponseHandling(res, 400, 'Provide all fields');
    }

    // status
    if (!status || status === undefined) {
      status = 'Draft';
    }

    // category and instructor validation
    const [categoryDetails, instructorDetails] = await Promise.all([
      Category.findOne({ categoryName: category }),
      User.findOne({ _id: userId }),
    ]);

    // validation
    if (!categoryDetails || !instructorDetails) {
      return ErrorResponseHandling(res, 400, 'Invalid credentials');
    }

    // upload image on cloudinary
    const uploadedImage = await uploadMediaToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME,
    );

    // save in data
    const data = await Course.create({
      courseName,
      courseDesc,
      price,
      category: categoryDetails._id,
      tags,
      benefits,
      requirements,
      status,
      thumbnail: uploadedImage.secure_url,
      instructor: instructorDetails._id,
    });

    // update instructor
    const [updatedInstructor, updatedCategory] = await Promise.all([
      User.findByIdAndUpdate(
        { _id: instructorDetails._id },
        { $push: { courses: data._id } },
        { new: true },
      ),
      Category.findByIdAndUpdate(
        { _id: categoryDetails._id },
        { $push: { courses: data._id } },
        { new: true },
      ),
    ]);

    // return res
    return res.status(200).json({
      success: true,
      message: 'Course created',
      data,
      updatedCategory,
      updatedInstructor,
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// edit course
export const editCourse = async (req: Request, res: Response): Promise<any> => {
  try {
    // fetch data
    const updates = req.body;
    const { courseId } = req.body;

    // course and category validation
    const [course, categoryDetails]: [
      course: any | null,
      categoryDetails: any | null,
    ] = await Promise.all([
      Course.findOne({ _id: courseId }),
      Category.findOne({ categoryName: updates.category }),
    ]);
    if (!course || !categoryDetails) {
      return ErrorResponseHandling(res, 400, 'Invalid credentials');
    }

    // if thumbnail present - upload
    if (req.files) {
      const thumbnail = req.files?.thumbnail as UploadedFile;
      const fileSizeInMb = thumbnail?.size / (1024 * 1024);
      if (fileSizeInMb > 1) {
        return ErrorResponseHandling(res, 400, 'Image should be under 1mb');
      }
      const uploadedImage = await uploadMediaToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME,
      );
      course.thumbnail = uploadedImage.secure_url;
    }

    // updates in db
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === 'category') {
          course[key] = categoryDetails._id;
        } else {
          course[key] = updates[key];
        }
      }
    }

    // save in db
    const data = await course.save();

    // return res
    return res.status(200).json({
      success: true,
      message: 'Course created',
      data,
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// delete course
export const deleteCourse = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {

    // fetch data
    const { courseId } = req.body;
    const { categoryId } = req.body;
    const userId = req.user?.id;

    // validation
    if (!courseId || !userId || !categoryId) {
      return ErrorResponseHandling(res, 400, 'Provide all details');
    }

    // course and category and user validation
    const [course,categoryDetails,userDetails] = await Promise.all([Course.findOne({ _id: courseId }),Category.findOne({_id:categoryId}),User.findOne({_id:userId})]);
    if (!course || !categoryDetails || !userDetails) {
      return ErrorResponseHandling(res, 400, 'Invalid credentials');
    }

    // delete in course db
    const data = await Course.findOneAndDelete({_id:courseId});

    // delete in user.course
    const updatedUser = await User.findByIdAndUpdate({_id:userId},{$pull:{courses:data?._id}},{new:true});

    // updatedCategory
    const updatedCategory = await Category.findByIdAndUpdate({_id:categoryId},{$pull:{courses:data?._id}},{new:true});

    // return res
    return res.status(200).json({
      success: true,
      message: 'Course created',
      data,
      updatedUser,
      updatedCategory
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// getInstructorCourse
export const getInstructorCourse = async (req:Request, res:Response): Promise<any> =>{
  try {
    // fetch data
    const userId = req.user?.id;

    // validation
    if(!userId){
      return ErrorResponseHandling(res,400,"Provide all details");
    }

    // findUserAndCourses
    const data = await User.findById(userId).populate("courses");

    if(!data){
      return ErrorResponseHandling(res,400,"Invalid credentials");
    }

    // return res
    return res.status(200).json({
      success:true,
      message:"fetched all instructor courses",
      data
    });

  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res,500,"Internal server error");
  }
}

// createSection

// create subSection

// edit section

// edit subSection

// delete section

// delete subSection

// get coursePageDetails

// get courseContent

// createLike

// create Rating and reviews

// createComment for particular subSection/video

