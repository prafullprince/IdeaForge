import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../../ui/input";
import React, { useEffect, useRef, useState } from "react";
import { fetchAllCategoryApi } from "../../../services/apiCall/category";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  createCourseApi,
  editCourseApi,
} from "../../../services/apiCall/course";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../../slices/courseSlice";

interface ICourseInfo {
  courseName: string;
  courseDesc: string;
  price: number;
  category: string;
  tags: string;
  thumbnail: any;
  benefits: string;
  requirements: string;
}

const CourseInfo = () => {
  // store
  const { token } = useSelector((state: any) => state.auth);
  const { editzCourse } = useSelector((state: any) => state.course);
  const { course } = useSelector((state: any) => state.course);
 
  // hook
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ICourseInfo>();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  // state
  const [loading, setLoading] = useState(false);
  const [allCategory, setAllCategory] = useState<any | null>([]);
  const [preview, setPriview] = useState<any | null | "">(null);

  // sideEffect -> categoryApiCall
  useEffect(() => {
    async function fetchCategory() {
      setLoading(true);
      try {
        // api call
        const result = await fetchAllCategoryApi();
        setAllCategory(result);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    // in editMode fill form
    if (editzCourse) {
      setValue("courseName", course.courseName);
      setValue("courseDesc", course.courseDesc);
      setValue("price", course.price);
      setValue("category", course.category);
      setValue("tags", course.tags);
      setValue("thumbnail", course.thumbnail);
      setValue("benefits", course.benefits);
      setValue("requirements", course.requirements);
    }
    fetchCategory();
  }, []);

  // isFormData
  function isFormUpdated() {
    if (editzCourse) {
      const currentValues = getValues();

      // check is any changes occur or not
      if (
        currentValues.courseName !== course.courseName ||
        currentValues.courseDesc !== course.courseDesc ||
        currentValues.category !== course.category ||
        currentValues.price !== course.price ||
        currentValues.tags !== course.tags ||
        currentValues.thumbnail !== course.thumbnail ||
        currentValues.benefits !== course.benefits ||
        currentValues.requirements !== course.requirements
      ) {
        return true;
      }
      return false;
    }
  }

  // changeHandler
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setPriview(previewUrl);
      setValue("thumbnail", e.target.files);
    }
  }

  // submitHandler
  const onsubmit: SubmitHandler<ICourseInfo> = async (data) => {
    try {
      // editCourse
      if (editzCourse) {
        try {
          if (isFormUpdated()) {
            setLoading(true);
            const currentValues = getValues();
            const formData = new FormData();
            formData.append("courseId", course._id);
            if (currentValues.courseName !== course.courseName) {
              formData.append("courseName", data.courseName);
            }
            if (currentValues.courseDesc !== course.courseDesc) {
              formData.append("courseDesc", data.courseDesc);
            }
            if (currentValues.price !== course.price) {
              formData.append("price", JSON.stringify(data.price));
            }
            if (currentValues.tags !== course.tags) {
              formData.append("tags", data.tags);
            }
            if (currentValues.thumbnail !== course.thumbnail) {
              formData.append("thumbnail", data.thumbnail[0]);
            }
            if (currentValues.benefits !== course.benefits) {
              formData.append("benefits", data.benefits);
            }
            if (currentValues.requirements !== course.requirements) {
              formData.append("requirements", data.requirements);
            }
            if (currentValues.category !== course.category) {
              formData.append("category", data.category);
            }

            await editCourseApi(formData, token, dispatch);
            setLoading(false);
            // reset form
            reset({
              courseName: "",
              courseDesc: "",
              price: 0,
              category: "",
              thumbnail: "",
              tags: "",
              benefits: "",
              requirements: "",
            });
          }
        } catch (error) {
          console.log(error);
        }
        return;
      }

      setLoading(true);
      // createCourse
      const formData = new FormData();
      formData.append("courseName", data.courseName);
      formData.append("courseDesc", data.courseDesc);
      formData.append("price", JSON.stringify(data.price));
      formData.append("tags", data.tags);
      formData.append("thumbnail", data.thumbnail[0]);
      formData.append("benefits", data.benefits);
      formData.append("requirements", data.requirements);
      formData.append("category", data.category);

      // apiCall
      await createCourseApi(formData, token, dispatch);
      setLoading(false);
      // reset form
      reset({
        courseName: "",
        courseDesc: "",
        price: 0,
        category: "",
        thumbnail: "",
        tags: "",
        benefits: "",
        requirements: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-xl text-richblack-5 font-semibold">
        {editzCourse ? <h1>Edit Course</h1> : <h1>Create Course</h1>}
      </div>
      {/* form */}
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="border border-[#2C333F] p-6 rounded-lg bg-richblack-900 sm:w-[70%] md:w-[70%] lg:w-[70%] xl:w-[70%] flex flex-col gap-6"
      >
        {/* title */}
        <div className="flex flex-col gap-[6px]">
          <label className="text-richblack-25">
            Course Title<sup className="text-pink-300 text-xl">*</sup>
          </label>
          <Input
            className="text-richblack-100 bg-richblack-800"
            {...register("courseName", {
              required: "Title is required",
              maxLength: {
                value: 100,
                message: "Maximum of 100 words allowed only.",
              },
            })}
            type="text"
            placeholder="Enter course title/name...."
          />
          {errors.courseName && (
            <p className="text-sm text-caribbeangreen-400 mt-1">
              {errors.courseName.message}
            </p>
          )}
        </div>
        {/* desc */}
        <div className="flex flex-col gap-[6px]">
          <label className="text-richblack-25">
            Course Description<sup className="text-pink-300 text-xl">*</sup>
          </label>
          <textarea
            className="flex h-20 w-full bg-richblack-800 text-richblack-50 border-none shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-900)]"
            {...register("courseDesc", {
              required: "description is required",
              maxLength: {
                value: 300,
                message: "Maximum of 300 words allowed only.",
              },
            })}
            placeholder="Enter course decription...."
          ></textarea>
          {errors.courseDesc && (
            <p className="text-sm text-caribbeangreen-400 mt-1">
              {errors.courseDesc.message}
            </p>
          )}
        </div>
        {/* price */}
        <div className="flex flex-col gap-[6px]">
          <label className="text-richblack-25">
            Price<sup className="text-pink-300 text-xl">*</sup>
          </label>
          <Input
            className="text-richblack-100 bg-richblack-800"
            {...register("price", {
              required: "purchase amount is required",
              valueAsNumber: true,
              maxLength: {
                value: 4,
                message: "Course should be under of Rs.9999.",
              },
            })}
            placeholder="Enter course price...."
          />
          {errors.price && (
            <p className="text-sm text-caribbeangreen-400 mt-1">
              {errors.price.message}
            </p>
          )}
        </div>
        {/* category */}
        <div className="flex flex-col gap-[6px]">
          <label className="text-richblack-25">
            Category<sup className="text-pink-300 text-xl">*</sup>
          </label>
          <select
            className="flex h-12 relative w-full bg-richblack-800 text-richblack-50 border-none shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
          disabled:cursor-not-allowed disabled:opacity-50
          dark:shadow-[0px_0px_1px_1px_var(--neutral-900)]"
            {...register("category", {
              required: "Please select category",
            })}
          >
            <option value={""}>Select an option</option>
            <>
              {allCategory.map((item: any) => (
                <option className="" key={item._id} value={item?.categoryName}>
                  {item?.categoryName}
                </option>
              ))}
            </>
          </select>
          {errors.category && (
            <p className="text-caribbeangreen-400 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
        {/* tags */}
        <div className="flex flex-col gap-[6px]">
          <label className="text-richblack-25">
            Tags<sup className="text-pink-300 text-xl">*</sup>
          </label>
          <Input
            className="text-richblack-100 bg-richblack-800"
            {...register("tags", {
              required: "Tags are required",
            })}
            type="text"
            placeholder="Enter tags..."
          />
          {errors.tags && (
            <p className="text-sm text-caribbeangreen-400 mt-1">
              {errors.tags.message}
            </p>
          )}
        </div>
        {/* thumbnail */}
        <div
          onClick={() => imageRef.current?.click()}
          className="flex flex-col gap-[6px]"
        >
          <label className="text-richblack-25">
            Course Thumbnail<sup className="text-pink-300 text-xl">*</sup>
          </label>
          <Input
            className="text-richblack-100 bg-richblack-800 hidden"
            type="file"
            {...register("thumbnail", {
              required: "Upload a thumbnail",
              validate: {
                lessThan1MB: (files) =>
                  files[0]?.size < 1 * 1024 * 1024 ||
                  "File size must be less than 1MB",
                acceptedFormats: (files) =>
                  ["image/jpeg", "image/png", "application/pdf"].includes(
                    files[0]?.type
                  ) || "Only JPEG, PNG, or PDF files are allowed",
                required: (files)=>
                  files.length >= 1 || "Upload thumbnail"
              },
            })}
            ref={imageRef}
            onChange={changeHandler}
          />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-[300px] object-cover bg-center bg-cover rounded-md hover:shadow-lg hover:shadow-blue-100 transition-all duration-300"
            />
          ) : (
            <div className="hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 w-full h-[300px] bg-richblack-800 border border-[#2C333F] border-dashed rounded-lg flex flex-col gap-8 items-center justify-center py-8">
              {/* icon */}
              <div className="">
                <div className="h-16 w-16 rounded-full bg-[#171717] flex justify-center items-center">
                  <IoCloudUploadOutline className="text-[#FFD60A] text-4xl" />
                </div>
              </div>
              {/* text */}
              <div className="max-w-[220px] text-[#999DAA] text-center text-xs">
                Drag and drop an image, or{" "}
                <span className="text-[#FFD60A] text-sm font-semibold">
                  Browse{" "}
                </span>
                Max 1MB each (only image)
              </div>
              {/* size */}
              <div className="flex items-center px-4 gap-6 text-xs max-w-[380px] text-[#6E727F]">
                <div>Aspect ratio 16:9</div>
                <div>Recommended size 1024x576</div>
              </div>
            </div>
          )}
          {errors.thumbnail && (<p className="text-sm text-caribbeangreen-400 mt-2">{errors.thumbnail.message as string}</p>)}
        </div>
        {/* benefits */}
        <div className="flex flex-col gap-[6px]">
          <label className="text-richblack-25">
            Benefits<sup className="text-pink-300 text-xl">*</sup>
          </label>
          <Input
            className="text-richblack-100 bg-richblack-800"
            {...register("benefits", {
              required: "Benefits are required",
              maxLength: {
                value: 500,
                message: "Maximum of 500 words allowed only.",
              },
            })}
            type="text"
            placeholder="Enter course benefits...."
          />
          {errors.benefits && (
            <p className="text-sm text-caribbeangreen-400 mt-1">
              {errors.benefits.message}
            </p>
          )}
        </div>
        {/* requirements */}
        <div className="flex flex-col gap-[6px]">
          <label className="text-richblack-25">
            Requirements<sup className="text-pink-300 text-xl">*</sup>
          </label>
          <Input
            className="text-richblack-100 bg-richblack-800"
            {...register("requirements", {
              required: "Requirements are required",
              maxLength: {
                value: 200,
                message: "Maximum of 200 words allowed only.",
              },
            })}
            type="text"
            placeholder="Enter course requirements...."
          />
          {errors.requirements && (
            <p className="text-sm text-caribbeangreen-400 mt-1">
              {errors.requirements.message}
            </p>
          )}
        </div>
        {/* button */}
        <div className="flex items-center w-full justify-end gap-6">
          <button
            className={`px-3 py-1 relative ${!loading ? "bg-yellow-50 text-yellow-900 hover:bg-richblack-900 hover:shadow-lg hover:shadow-blue-100" : "bg-richblack-900 text-richblack-5 py-3 px-8"} hover:text-richblack-5 rounded-md text-lg font-medium transition-all duration-300`}
            type="submit"
          >
            {loading && (
              <div className="loaderm absolute w-8 aspect-square rounded-full bg-[linear-gradient(0deg,rgb(255,230,6)_30%,#ffef0b_0_70%,rgb(255,225,0)_0)_50%/8%_100%,linear-gradient(90deg,rgb(107,255,2)_30%,#ee1212f9_0_70%,rgb(255,1,137)_0)_50%/100%_8%] bg-no-repeat left-1/2 bottom-1 right-1/2 top-[2px] animate-l23">
                <div className="before absolute inset-0 rounded-full bg-inherit opacity-[0.915] rotate-[30deg]"></div>
                <div className="after absolute inset-0 rounded-full bg-inherit opacity-[0.83] rotate-[60deg]"></div>
              </div>
            )}
            {editzCourse ? <>{loading ? <></> : <p>Edit</p>}</> : <p className={`${loading ? "hidden" : "block"}`}>Create</p>}
          </button>
          {editzCourse ? (
            <button
              onClick={() => dispatch(setStep(2))}
              className="px-3 py-2 bg-richblack-800 text-white rounded-md text-lg font-medium hover:shadow-lg hover:shadow-blue-100 transition-all duration-300"
            >
              Next
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default CourseInfo;
