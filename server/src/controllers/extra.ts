import { Request, Response } from 'express';
import { ErrorResponseHandling } from '../helper/EroorResponse';
import Course from '../models/Course';
import Fuse from 'fuse.js';

// searchApis
export const searchCourse = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const { query } = req.body;

    if (!query) {
      return ErrorResponseHandling(res, 400, 'please provide query');
    }

    // course
    const course = await Course.find({})
      .select('courseName courseDesc thumbnail')
      .populate([
        { path: 'instructor', select: 'name image' },
        { path: 'category', select: 'categoryName' },
      ])
      .lean()
      .limit(5);
    // options
    const options = {
      keys: [{name:'courseName',weight: 0.8}, {name:'category.categoryName',weight:0.1}, {name:'instructor.name',weight:0.1}],
      threshold: 0.3,
    };

    // fuse
    const fuse: any = new Fuse(course, options);

    const result = fuse.search(query);
    const data = result.map((course: any) => course.item);

    // return res
    return res.status(200).json({
      success: true,
      message: 'search succeed',
      data,
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

// searchResultApis
export const searchResults = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    // fetch data
    const { query } = req.body;
    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 10;

    // validation
    if (!query || !page || !limit) {
      return ErrorResponseHandling(res, 400, 'please provide query');
    }

    // skip
    const skip = (page-1) * limit ;

    // course
    const course = await Course.find({})
      .select('courseName courseDesc thumbnail')
      .populate([
        { path: 'instructor', select: 'name image' },
        { path: 'category', select: 'categoryName' },
      ])
      .lean()
      ;

    // options
    const options = {
      keys: [{name:'courseName',weight: 0.8}, {name:'category.categoryName',weight:0.1}, {name:'instructor.name',weight:0.1}],
      threshold: 0.3,
    };

    // fuse
    const fuse: any = new Fuse(course, options);

    // all result
    const result = fuse.search(query);

    // totalCourse
    const totalCourse = result.length;

    // paginatedResult
    const paginatedResults = result.slice(skip,skip+limit);

    // finalData
    const data = paginatedResults.map((course: any) => course.item);

    // return res
    return res.status(200).json({
      success: true,
      message: 'search succeed',
      data:{
        totalCourse,
        page,
        data,
        totalPage : Math.ceil(totalCourse/limit) 
      }
    });

  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};


// calculateBlogs
export const totalViews = async (req: Request, res: Response): Promise<any> => {
  try {
    // fetch IPAdress
    const { courseId } = req.body;
    const xForwardedFor = req.headers['x-forwarded-for'];

    const clientIp = Array.isArray(xForwardedFor)
      ? xForwardedFor[0]
      : xForwardedFor?.split(',')[0] || req.ip;

    console.log(clientIp);

    if (!clientIp) {
      return ErrorResponseHandling(res, 400, 'please provide query');
    }

    // course
    const course = await Course.findOne({ _id: courseId });
    if (!course) {
      return ErrorResponseHandling(res, 400, 'Course not found');
    }

    // ifAlreadyViewed
    if (course?.viewedByIp?.includes(clientIp)) {
      return res.status(200).json({
        success: true,
        message: 'Already viewed',
        data: {
          totalView: course.viewedByIp.length > 0 ? course.viewedByIp.length : 0,
          totalRating: course.ratings.length > 0 ? course.ratings.length : 0,
        },
      });
    }

    // updateVIews
    const updatedData = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: { viewedByIp: clientIp },
      },
      { new: true },
    );

    // return res
    return res.status(200).json({
      success: true,
      message: 'views succeed',
      data: {
        totalView: course.viewedByIp.length > 0 ? course.viewedByIp.length : 0,
        totalRating: course.ratings.length > 0 ? course.ratings.length : 0,
      },
    });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};
