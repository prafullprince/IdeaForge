import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import React, { memo, useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSectionApi,
  editSubSectionApi,
} from "../../services/apiCall/course";
import toast from "react-hot-toast";
import { setEditzSubSection } from "../../slices/courseSlice";

interface ISubSectionInfo {
  title: string;
  description: string;
  videoUrl: any;
}

const AddModal = ({ addLectureModal, setAddLectureModal, setRefresh }: any) => {
  // hook
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ISubSectionInfo>();
  const videoUrlRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  // store
  const { token } = useSelector((state: any) => state.auth);
  const { editzSubSection } = useSelector((state: any) => state.course);

  // state
  const [preview, setPreview] = useState<any | null | "">(null);
  const [loading, setLoading] = useState(false);

  // change-handler
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setPreview(previewUrl);
      setValue("videoUrl", e.target.files);
    }
  }

  // isFormUpdated
  function isFormUpdated() {
    const currentValues = getValues();

    if (
      currentValues.title !== addLectureModal.subSectionDetails.title ||
      currentValues.description !==
        addLectureModal.subSectionDetails.description ||
      currentValues.videoUrl !== addLectureModal.subSectionDetails.videoUrl
    ) {
      return true;
    } else {
      toast.error("Form is not updated");
      return false;
    }
  }

  // create/edit subSection
  const onsubmit: SubmitHandler<ISubSectionInfo> = async (data) => {
    // editSubSection
    if (editzSubSection) {
      if (isFormUpdated()) {
        const currentValues = getValues();

        const formData = new FormData();
        formData.append("subSectionId", addLectureModal.subSectionId);
        if (currentValues.title !== addLectureModal.subSectionDetails.title) {
          formData.append("title", currentValues.title);
        }
        if (
          currentValues.description !==
          addLectureModal.subSectionDetails.description
        ) {
          formData.append("description", currentValues.description);
        }
        if (
          currentValues.videoUrl !== addLectureModal.subSectionDetails.videoUrl
        ) {
          formData.append("videoUrl", currentValues.title);
        }
        setLoading(true);
        await editSubSectionApi(formData, token);
        reset({
          title: "",
          description: "",
          videoUrl: "",
        });
        setRefresh((prev: any) => !prev);
        setAddLectureModal(null);
        setLoading(false);
      }
      return;
    }

    // create subSection
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("videoUrl", data.videoUrl[0]);
      formData.append("sectionId", addLectureModal.sectionId);

      await createSubSectionApi(formData, token);
      reset({
        title: "",
        description: "",
        videoUrl: "",
      });
      setRefresh((prev: any) => !prev);
      setAddLectureModal(null);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // sideEffect
  useEffect(() => {
    if (editzSubSection) {
      setValue("title", addLectureModal.subSectionDetails.title);
      setValue("description", addLectureModal.subSectionDetails.description);
      setValue("videoUrl", addLectureModal.subSectionDetails.videoUrl);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] bg-white bg-opacity-10 backdrop-blur-sm flex items-center justify-center w-full min-h-screen overflow-auto">
      <div className="w-11/12 mx-auto min-w-[350px] flex flex-col max-w-[1000px] rounded-b-lg">
        {/* header */}
        <div className="px-6 py-4 flex justify-between items-center bg-[#2C333F] border-b-[1px] border-b-[#424854]">
          <div className="text-[#FFFFFF] text-lg font-semibold">
            {editzSubSection ? <>Edit Lecture</> : <>Add Lecture</>}
          </div>
          <button
            onClick={() => setAddLectureModal(null)}
            className="text-xl text-pink-200"
          >
            X
          </button>
        </div>
        {/* body - form */}
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="bg-[#000000] flex flex-col gap-6 p-8"
        >
          {/* sub-sectionName */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-richblack-25">
              Lecture Title<sup className="text-pink-300 text-xl">*</sup>
            </label>
            <Input
              className="text-richblack-100 bg-richblack-800"
              {...register("title", {
                required: "Title is required",
                maxLength: {
                  value: 100,
                  message: "Maximum of 100 words allowed only.",
                },
              })}
              type="text"
              placeholder="Enter title...."
            />
            {errors.title && (
              <p className="text-sm text-caribbeangreen-400 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          {/* sub-sectionDesc */}
          <div className="flex flex-col gap-[6px]">
            <label className="text-richblack-25">
              Lecture description<sup className="text-pink-300 text-xl">*</sup>
            </label>
            <Input
              className="text-richblack-100 bg-richblack-800"
              {...register("description", {
                required: "Description is required",
                maxLength: {
                  value: 100,
                  message: "Maximum of 100 words allowed only.",
                },
              })}
              type="text"
              placeholder="Enter description...."
            />
            {errors.description && (
              <p className="text-sm text-caribbeangreen-400 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          {/* sub-sectionVideo */}
          <div
            onClick={() => videoUrlRef.current?.click()}
            className="flex flex-col gap-[6px]"
          >
            <label className="text-richblack-25">
              Lecture Video<sup className="text-pink-300 text-xl">*</sup>
            </label>
            <Input
              className="text-richblack-100 bg-richblack-800 hidden"
              {...register("videoUrl", {
                required: "Video is required",
              })}
              type="file"
              onChange={changeHandler}
              ref={videoUrlRef}
              placeholder="Enter Video...."
              accept="video/*"
            />
            {preview ? (
              <video className="w-full h-[400px] object-cover bg-center bg-cover rounded-md hover:shadow-lg hover:shadow-blue-100 transition-all duration-300">
                <source
                  src={preview}
                  width={300}
                  height={400}
                  className="w-full h-[400px] object-cover bg-center bg-cover rounded-md hover:shadow-lg hover:shadow-blue-100 transition-all duration-300"
                />
              </video>
            ) : (
              <div className="hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 w-full h-[400px] bg-richblack-800 border border-[#2C333F] border-dashed rounded-lg flex flex-col gap-8 items-center justify-center py-8">
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
            {errors.videoUrl && (
              <p className="text-sm text-caribbeangreen-400 mt-1">
                {errors.videoUrl.message as string}
              </p>
            )}
          </div>
          {/* buttons */}
          <div className="flex items-center gap-4 relative">
            {loading && (
              <div className="loaderm absolute w-8 aspect-square rounded-full bg-[linear-gradient(0deg,rgb(255,230,6)_30%,#ffef0b_0_70%,rgb(255,225,0)_0)_50%/8%_100%,linear-gradient(90deg,rgb(107,255,2)_30%,#ee1212f9_0_70%,rgb(255,1,137)_0)_50%/100%_8%] bg-no-repeat left-1/2 bottom-1 animate-l23">
                <div className="before absolute inset-0 rounded-full bg-inherit opacity-[0.915] rotate-[30deg]"></div>
                <div className="after absolute inset-0 rounded-full bg-inherit opacity-[0.83] rotate-[60deg]"></div>
              </div>
            )}
            <button
              className={`px-3 ${
                loading ? "hidden" : "block"
              } py-2 bg-yellow-100 text-richblack-900 text-lg rounded-lg`}
              type="submit"
            >
              {editzSubSection ? <>Save Edit</> : <>Create</>}
            </button>
            <button
              className="px-3 py-2 bg-yellow-900 text-richblack-5 text-lg rounded-lg"
              onClick={() => {
                setAddLectureModal(null);
                dispatch(setEditzSubSection(false));
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(AddModal);
