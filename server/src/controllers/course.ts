import { Request, Response } from 'express';
import { ErrorResponseHandling } from '../helper/EroorResponse';
import Category from '../models/Category';
import User from '../models/User';
import { uploadMediaToCloudinary } from '../helper/UploadMedia';
import Course from '../models/Course';
import { UploadedFile } from 'express-fileupload';
import Section from '../models/Section';
import SubSection from '../models/SubSection';
import client from '../config/redis';
import CourseProgress from '../models/CourseProgress';
import { WebSocket } from 'ws';
import Notification from '../models/Notification';
import {  } from '../websocket/sendMessage';

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
    if (fileSizeInMb > 1) {
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

    console.time('upload');
    // upload image on cloudinary
    const uploadedImage = await uploadMediaToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME,
      400,
      400,
    );
    console.timeEnd('upload');

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
    res.status(200).json({
      success: true,
      message: 'Course created',
      data,
      updatedCategory,
      updatedInstructor,
    });

    // send notifications
    // const followers = instructorDetails.followers;
    // followers.forEach(async (followerId) => {
    //   const followerIdString = followerId.toString();
    //   const ws = userConnection.get(followerIdString);
    //   const notification = `${instructorDetails?.name} uploaded: ${courseName}`;
    //   if (ws && ws.readyState === WebSocket.OPEN) {
    //     ws.send(JSON.stringify({
    //       userId: followerId,
    //       message: notification,
    //       thumbnail: instructorDetails.image
    //     }));
    //   } else {
    //     // save notifications in db
    //     await Notification.create({
    //       userId: followerId,
    //       message: notification,
    //       thumbnail: instructorDetails.image
    //     });
    //   }
    // });

    return;
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

    if (!courseId) {
      return ErrorResponseHandling(res, 400, 'pass course');
    }

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
    const [course, categoryDetails, userDetails] = await Promise.all([
      Course.findOne({ _id: courseId }),
      Category.findOne({ _id: categoryId }),
      User.findOne({ _id: userId }),
    ]);
    if (!course || !categoryDetails || !userDetails) {
      return ErrorResponseHandling(res, 400, 'Invalid credentials');
    }

    // delete in course db
    const data = await Course.findOneAndDelete({ _id: courseId });

    // delete in user.course
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { courses: data?._id } },
      { new: true },
    );

    // updatedCategory
    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: categoryId },
      { $pull: { courses: data?._id } },
      { new: true },
    );

    // return res
    return res.status(200).json({
      success: true,
      message: 'Course deleted',
      data,
      updatedUser,
      updatedCategory,
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// getInstructorCourse
export const getInstructorCourse = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const userId = req.user?.id;
    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 3;
    const { status } = req.body;

    // validation
    if (!userId || !status) {
      return ErrorResponseHandling(res, 400, 'Provide all details');
    }

    //  Validate page and limit
    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: 'Page and limit must be positive integers',
      });
    }

    // // cached value
    // const cachedValue = await client.get(`instructorCourse:${userId}`);
    // if(cachedValue){
    //   try {
    //     const data = JSON.parse(cachedValue);
    //     return res.status(200).json({
    //       success:true,
    //       message:"fetched all instructor courses",
    //       data
    //     })
    //   } catch (parseError) {
    //     console.log(parseError);
    //     await client.del("instructorCourse")
    //   }
    // }

    // courses of instructor
    const course: any = await Course.find({
      instructor: userId,
      status: status,
    }).sort({ createdAt: -1 });
    if (!course) {
      return ErrorResponseHandling(res, 400, 'Invalid credentials');
    }

    // skip,calculation
    const skip = (page - 1) * limit;
    const totalCourse = course.length;
    const totalPages = Math.ceil(totalCourse / limit);

    // findUserAndCourses
    const data = await Course.find({ instructor: userId, status: status })
      .skip(skip)
      .limit(limit);

    // // if not cached then cached it
    // await client.set(`instructorCourse:${userId}`,JSON.stringify(data));
    // await client.expire(`instructorCourse:${userId}`,10);

    // return res
    return res.status(200).json({
      success: true,
      message: 'fetched all instructor courses',
      pagination: {
        data,
        totalPages,
        totalCourse,
      },
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// createSection
export const createSection = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    let { sectionName, courseId } = req.body;

    // validation
    if (!sectionName || !courseId) {
      return ErrorResponseHandling(res, 400, 'Provide all fields');
    }

    // save in data
    const data = await Section.create({
      sectionName,
    });

    // updated course
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      { $push: { sections: data._id } },
      { new: true },
    );
    if (!updatedCourse) {
      return ErrorResponseHandling(res, 400, 'invalid credentials');
    }

    // return res
    return res.status(200).json({
      success: true,
      message: 'Section created',
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// edit section
export const editSection = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const { sectionId, sectionName } = req.body;

    // validation
    if (!sectionId || !sectionName) {
      return ErrorResponseHandling(res, 400, 'section not found');
    }

    // check section is valid or not
    const section = await Section.findOne({ _id: sectionId });
    if (!section) {
      return ErrorResponseHandling(res, 400, 'Invalid credentials');
    }

    // edit data
    section.sectionName = sectionName;

    // save data
    await section.save();

    // return res
    return res.status(200).json({
      success: true,
      message: 'Section edited',
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// delete section
export const deleteSection = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const { sectionId } = req.body;
    const { courseId } = req.body;

    // validation
    if (!courseId || !sectionId) {
      return ErrorResponseHandling(res, 400, 'Provide all details');
    }

    // delete in section db
    const data = await Section.findOneAndDelete({ _id: sectionId });
    if (!data) {
      return ErrorResponseHandling(res, 400, 'Invalid credentials');
    }

    // delete in user.course
    await Course.findByIdAndUpdate(
      { _id: courseId },
      { $pull: { sections: data?._id } },
      { new: true },
    );

    // return res
    return res.status(200).json({
      success: true,
      message: 'Section deleted',
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// getCourseContent
export const getCourseContent = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    let { courseId } = req.body;

    // validation
    if (!courseId) {
      return ErrorResponseHandling(res, 400, 'Course not found');
    }

    // find in db
    const data = await Course.findOne({
      _id: courseId,
    })
      .select('sections')
      .populate({
        path: 'sections',
        populate: {
          path: 'subSections',
          select: 'title description duration videoUrl',
        },
      })
      .lean();

    if (!data) {
      return ErrorResponseHandling(res, 400, 'invalid credentials');
    }

    // return res
    return res.status(200).json({
      success: true,
      message: 'Course content fetched',
      data,
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// create subSection
export const createSubSection = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const { sectionId, title, description } = req.body;
    const videoUrl = req.files?.videoUrl as UploadedFile;
    console.log(sectionId);
    // validation
    if (!sectionId || !title || !description || !videoUrl) {
      return ErrorResponseHandling(res, 400, 'Provide all fields');
    }

    // uploadFile
    const uploadedFile = await uploadMediaToCloudinary(
      videoUrl,
      process.env.FOLDER_NAME!,
    );
    console.log(uploadedFile);
    // save in data
    const data = await SubSection.create({
      title,
      description,
      duration: uploadedFile.duration,
      videoUrl: uploadedFile.secure_url,
    });

    // updated section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSections: data._id } },
      { new: true },
    );
    if (!updatedSection) {
      return ErrorResponseHandling(res, 400, 'invalid credentials');
    }

    // return res
    return res.status(200).json({
      success: true,
      message: 'Sub-Section created',
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// edit subSection
export const editSubSection = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const { subSectionId, title, description } = req.body;

    // validation
    if (!subSectionId) {
      return ErrorResponseHandling(res, 400, 'Provide all fields');
    }

    // subSection
    const subSection: any = await SubSection.findOne({ _id: subSectionId });

    if (!subSection) {
      return ErrorResponseHandling(res, 400, 'Invalid credentials');
    }

    // if video is present
    if (req.files) {
      const videoUrl = req.files?.videoUrl as UploadedFile;
      const uploadedFile = await uploadMediaToCloudinary(
        videoUrl,
        process.env.FOLDER_NAME!,
      );
      subSection.videoUrl = uploadedFile.secure_url;
      subSection.duration = uploadedFile.duration;
    }

    // title,description
    if (title) {
      subSection.title = title;
    }

    if (description) {
      subSection.description = description;
    }

    await subSection.save();

    // return res
    return res.status(200).json({
      success: true,
      message: 'Sub-Section edited',
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// delete subSection
export const deleteSubSection = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const { subSectionId, sectionId } = req.body;

    // validation
    if (!sectionId || !subSectionId) {
      return ErrorResponseHandling(res, 400, 'Provide all details');
    }

    // delete in subSection db
    const data = await SubSection.findOneAndDelete({ _id: subSectionId });
    if (!data) {
      return ErrorResponseHandling(res, 400, 'Invalid credentials');
    }

    // delete in subSection in section
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $pull: { subSections: data?._id } },
      { new: true },
    );

    // return res
    return res.status(200).json({
      success: true,
      message: 'Sub-Section deleted',
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// publish course
export const publishCourse = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const { courseId, status } = req.body;

    // validation
    if (!courseId || !status) {
      return ErrorResponseHandling(res, 400, 'Provide all details');
    }

    // updateCourse status
    const data = await Course.findByIdAndUpdate(
      { _id: courseId },
      { status: status },
      { new: true },
    );
    if (!data) {
      return ErrorResponseHandling(res, 400, 'Invalid credentials');
    }

    // return res
    return res.status(200).json({
      success: true,
      message: `Course status is now ${status}`,
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// get coursePageDetails
export const coursePageDetails = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const { courseId } = req.body;

    // validation
    if (!courseId) {
      return ErrorResponseHandling(res, 400, 'Provide all details');
    }

    // if cached present use them
    const cachedValue = await client.get(`coursePageDetails:${courseId}`);
    if (cachedValue) {
      try {
        const data = JSON.parse(cachedValue);
        return res
          .status(200)
          .json({ success: true, message: 'Success', data });
      } catch (error) {
        console.log(error);
        await client.del(`coursePageDetails:${courseId}`);
      }
    }

    // findCourse details
    const data = await Course.findOne({ _id: courseId })
      .populate([
        { path: 'category', select: 'categoryName' },
        {
          path: 'instructor',
          select: 'name email image followers following courses',
        },
        {
          path: 'sections',
          populate: {
            path: 'subSections',
            select: 'title',
          },
        },
      ])
      .lean();
    if (!data) {
      return ErrorResponseHandling(res, 400, 'Invalid credentials');
    }

    // if not cached then cached them
    await client.set(`coursePageDetails:${courseId}`, JSON.stringify(data));
    await client.expire(`coursePageDetails:${courseId}`, 100);

    // return res
    return res.status(200).json({
      success: true,
      message: `Course fetched successfully`,
      data,
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// mark video as completed
export const markVideoAsCompleted = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const { courseId, subSectionId } = req.body;
    const userId = req.user?.id;

    // validation
    if (!courseId || !userId || !subSectionId) {
      return ErrorResponseHandling(res, 400, 'Provide all details');
    }

    // create progress
    let courseProgress = await CourseProgress.findOne({
      userId: userId,
      courseId: courseId,
    });

    // if courseProgress is not set
    if (!courseProgress) {
      courseProgress = new CourseProgress({
        courseId: courseId,
        userId: userId,
        completedVideos: [],
      });
    }

    // save subSection in completedVideos
    if (courseProgress.completedVideos.includes(subSectionId)) {
      return ErrorResponseHandling(res, 400, 'Already mark as completed');
    }

    // if not already completed
    courseProgress.completedVideos.push(subSectionId);

    // save in db
    await courseProgress.save();

    // return res
    return res.status(200).json({
      success: true,
      message: `Course progress done`,
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// userEnrolledCourses
export const studentEnrolledCourses = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const userId = req.user?.id;

    // validation
    if (!userId) {
      return ErrorResponseHandling(res, 400, 'Provide all details');
    }

    // check is cached available
    const cachedValue = await client.get(`enrolledCourse:${userId}`);
    if (cachedValue) {
      try {
        const data = JSON.parse(cachedValue);
        return res.status(200).json({
          success: true,
          message: 'All Enrolled Courses',
          data,
        });
      } catch (error) {
        console.log(error);
        await client.del(`enrolledCourse:${userId}`);
      }
    }

    // find user
    const user = await User.findOne({ _id: userId })
      .populate({
        path: 'courses',
        populate: {
          path: 'sections',
        },
      })
      .populate({
        path: 'courses',
        populate: {
          path: 'instructor',
          select: 'name image followers following courses',
        },
      });
    if (!user) {
      return ErrorResponseHandling(res, 400, 'User not found');
    }

    // allCourse
    const data = user.courses;

    // if not cached then cached them
    await client.set(`enrolledCourse:${userId}`, JSON.stringify(data));
    await client.expire(`enrolledCourse:${userId}`, 40);

    // return res
    return res.status(200).json({
      success: true,
      message: `All Enrolled Courses`,
      data,
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// courseViewPageDetails
export const courseViewPageDetails = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const userId = req.user?.id;
    const { courseId } = req.body;

    // validation
    if (!userId || !courseId) {
      return ErrorResponseHandling(res, 400, 'Provide all details');
    }

    // check is cached available
    const cachedValue = await client.get(`courseView:${courseId}`);
    if (cachedValue) {
      try {
        const data = JSON.parse(cachedValue);
        return res.status(200).json({
          success: true,
          message: 'All Enrolled Courses',
          data,
        });
      } catch (error) {
        console.log(error);
        await client.del(`courseView:${courseId}`);
      }
    }

    // isValid credentials
    const [user, course] = await Promise.all([
      User.findOne({ _id: userId }),
      Course.findOne({ _id: courseId }),
    ]);

    // validation
    if (!user || !course) {
      return ErrorResponseHandling(res, 400, 'Invalid credentials');
    }

    // fullDetails
    const data = await Course.findOne({ _id: courseId })
      .populate([
        {
          path: 'sections',
          populate: {
            path: 'subSections',
          },
        },
      ])
      .lean();

    // if not cached then cached them
    await client.set(`courseView:${courseId}`, JSON.stringify(data));
    await client.expire(`courseView:${courseId}`, 40);

    // return res
    return res.status(200).json({
      success: true,
      message: `All Enrolled Courses`,
      data,
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// createLike

// create Rating and reviews

// createComment for particular subSection/video
