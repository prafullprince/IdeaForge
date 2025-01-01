import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { useEffect, useState } from "react";
import {
  createSectionApi,
  editSectionApi,
  getCourseContentApi,
} from "../../../services/apiCall/course";
import Section from "./Section";
import { setEditzSection, setStep } from "../../../slices/courseSlice";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

interface ISectionInfo {
  sectionName: string;
}

const CourseBuilder = () => {
  // hook
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ISectionInfo>();
  const dispatch = useDispatch();

  // store
  const { course, editzSection, section } = useSelector(
    (state: any) => state.course
  );
  const { token } = useSelector((state: any) => state.auth);

  // state
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // handleSubmit -> create and edit section
  const onsubmit: SubmitHandler<ISectionInfo> = async (data) => {
    try {
      // editMode
      if (editzSection) {
        try {
          setLoading(true);
          const currentValues = getValues();
          if (currentValues.sectionName === section.sectionName) {
            return toast.error("Section name is still same");
          }
          const formData = new FormData();
          formData.append("sectionId", section._id);
          formData.append("sectionName", data.sectionName);
          await editSectionApi(formData, token);
          setRefresh((prev) => !prev);
          dispatch(setEditzSection(false));
          reset({
            sectionName: "",
          });
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
        return;
      }

      // createMode
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("sectionName", data.sectionName);
        formData.append("courseId", course._id);
        await createSectionApi(formData, token);
        setRefresh((prev) => !prev);
        reset({
          sectionName: "",
        });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // sideEffects -> apiCall(courseContent)
  useEffect(() => {
    async function getContentApiCall() {
      setLoading(true);
      try {
        // apiCall
        const sections = await getCourseContentApi(course?._id);
        setContent(sections);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    getContentApiCall();
  }, [refresh]);

  useEffect(() => {
    // alreadySetTheSection
    if (editzSection) {
      setValue("sectionName", section.sectionName);
    }
  }, [editzSection]);

  return (
    <div className="flex flex-col gap-6">
      {/* header */}
      <div className="text-xl text-richblack-5 font-semibold">
        {editzSection ? <h1>Edit Section</h1> : <h1>Create Section</h1>}
      </div>
      {/* form */}
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="border border-[#2C333F] min-h-[220px] p-6 rounded-lg bg-richblack-900 sm:w-[70%] md:w-[70%] lg:w-[70%] xl:w-[70%] flex flex-col gap-6"
      >
        {/* sectionName */}
        <div className="flex flex-col gap-[6px]">
          <label className="text-richblack-25">
            Section Name<sup className="text-pink-300 text-xl">*</sup>
          </label>
          <Input
            className="text-richblack-100 bg-richblack-800"
            {...register("sectionName", {
              required: "Section is required",
              maxLength: {
                value: 100,
                message: "Maximum of 100 words allowed only.",
              },
            })}
            type="text"
            placeholder="Enter section name...."
          />
          {errors.sectionName && (
            <p className="text-sm text-caribbeangreen-400 mt-1">
              {errors.sectionName.message}
            </p>
          )}
        </div>
        {/* button */}
        {loading ? (
          <div className="relative mt-8">
            <div className="loaderm absolute w-8 aspect-square rounded-full bg-[linear-gradient(0deg,rgb(255,230,6)_30%,#ffef0b_0_70%,rgb(255,225,0)_0)_50%/8%_100%,linear-gradient(90deg,rgb(107,255,2)_30%,#ee1212f9_0_70%,rgb(255,1,137)_0)_50%/100%_8%] bg-no-repeat left-1/2 bottom-1 animate-l23">
              <div className="before absolute inset-0 rounded-full bg-inherit opacity-[0.915] rotate-[30deg]"></div>
              <div className="after absolute inset-0 rounded-full bg-inherit opacity-[0.83] rotate-[60deg]"></div>
            </div>
          </div>
        ) : (
          <button
            className={`px-3 relative py-2 flex justify-center bg-yellow-100 text-yellow-900
            rounded-md text-lg font-medium hover:shadow-lg hover:shadow-blue-100 transition-all duration-300`}
            type="submit"
          >
            {editzSection ? (
              <div
                className={`flex items-center gap-2 ${
                  loading ? "hidden" : "block"
                }`}
              >
                {" "}
                <FiEdit className="text-2xl font-bold" /> Edit Section
              </div>
            ) : (
              <div
                className={`flex ${
                  loading ? "hidden" : "block"
                } items-center gap-2`}
              >
                {" "}
                <IoMdAdd className="text-2xl font-bold" /> Create Section
              </div>
            )}
          </button>
        )}
      </form>
      {/* courseContent */}
      <div className="border mt-6 border-[#2C333F] p-6 rounded-lg bg-richblack-900 w-full xl:w-[70%] flex flex-col gap-6">
        {/* heading */}
        <div className="text-xl relative text-richblack-5 font-semibold">
          Course Content
          {loading && !editzSection && (
            <div className="loaderm absolute w-8 aspect-square rounded-full bg-[linear-gradient(0deg,rgb(255,230,6)_30%,#ffef0b_0_70%,rgb(255,225,0)_0)_50%/8%_100%,linear-gradient(90deg,rgb(107,255,2)_30%,#ee1212f9_0_70%,rgb(255,1,137)_0)_50%/100%_8%] bg-no-repeat left-1/2 bottom-1 animate-l23">
              <div className="before absolute inset-0 rounded-full bg-inherit opacity-[0.915] rotate-[30deg]"></div>
              <div className="after absolute inset-0 rounded-full bg-inherit opacity-[0.83] rotate-[60deg]"></div>
            </div>
          )}
        </div>
        {/* content */}
        <div className="mt-6">
          {/* allSections */}
          <div className="flex flex-col gap-4 relative min-h-20">
            {content.length === 0 ? (
              <p>No content found.</p>
            ) : (
              <>
                {content?.map((section: any) => (
                  <Section
                    section={section}
                    key={section._id}
                    setRefresh={setRefresh}
                    setValue={setValue}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      {/* next button */}
      <div className="w-full flex justify-start">
        <button
          onClick={() => {
            dispatch(setStep(3));
          }}
          className="px-4 py-2 bg-yellow-50 text-richblack-900 border-0 rounded-lg font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseBuilder;
