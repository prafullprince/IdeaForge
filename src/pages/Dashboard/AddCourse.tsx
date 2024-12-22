import { FaCheck } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import CourseInfo from "../../components/AddCourse/info/CourseInfo";
import CourseBuilder from "../../components/AddCourse/builder/CourseBuilder";
import CoursePublish from "../../components/AddCourse/publish/CoursePublish";
import { Link } from "react-router-dom";

const steps = [
  { id: 1, name: "Course Information" },
  { id: 2, name: "Course Builder" },
  { id: 3, name: "Publish" },
];

const AddCourse = () => {
  // store
  const { step } = useSelector((state: any) => state.course);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col gap-8 w-full xl:w-[75%] 2xl:w-[60%]">
        {/* back to dashboard button */}
        <Link to={"/dashboard/profile"} className="flex gap-1 w-fit text-[#838894] items-center">
          <IoChevronBack className="text-lg" />
          <p className="text-sm">Back to Dashboard</p>
        </Link>

        {/* render steps */}
        <div className="flex flex-col gap-2 w-full">
          {/* step */}
          <div className="flex items-center w-full mx-auto justify-center">
            {steps.map((item) => (
              <div key={item.id} className="flex w-full">
                {/* number */}
                <div
                  className={`rounded-full ${
                    step === item.id
                      ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                      : "border-richblack-700 bg-richblack-800 text-richblack-300"
                  } min-w-9 min-h-9 border flex items-center justify-center ${
                    step > item.id && "bg-yellow-50 text-yellow-50"
                  }`}
                >
                  {step > item.id ? (
                    <FaCheck className="font-[900] text-richblack-900 text-xl" />
                  ) : (
                    <p>{item.id}</p>
                  )}
                </div>
                {/* dashed border */}
                {item.id !== steps.length && (
                  <div
                    className={`h-[calc(34px/2)] ${
                      item.id !== steps.length ? "w-[100%]" : "w-0"
                    } border-b border-dashed ${
                      item.id < step ? "border-[#FFD60A]" : "border-[#424854]"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          {/* name */}
        </div>

        {/* courseForm */}
        {step === 1 && <CourseInfo />}
        {step === 2 && <CourseBuilder />}
        {step === 3 && <CoursePublish />}
      </div>
    </div>
  );
};

export default AddCourse;
