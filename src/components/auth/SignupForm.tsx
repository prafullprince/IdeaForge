import { useState } from "react";
import Tab from "../common/Tab";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import clsx from "clsx";
import { sendOtpApi } from "../../services/apiCall/auth";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

// formInputTypes
interface formInputTypes {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// data
const data: string[] = ["Student", "Instructor"];

// component
const SignupForm = () => {
  // hook
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state
  const [tabData, setTabData] = useState(data[0]);
  const [loading, setLoading] = useState(false);

  // useForm
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<formInputTypes>();
  const passwordValue = watch("password");

  // submitHandler
  const onSubmit: SubmitHandler<formInputTypes> = async (data: any) => {
    setLoading(true);
    try {
      // saveData in store for signup after otp validation
      const accountType = tabData;
      dispatch(setSignupData({ ...data, accountType }));

      // sendOtpApiCall
      await sendOtpApi(data.email, navigate);

      // resetForm after successfull apiCall
      reset({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* tab */}
      <div className="w-fit mt-4">
        <Tab
          which="signup"
          data={data}
          tabData={tabData}
          setTabData={setTabData}
        />
      </div>

      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5 mt-6"
      >
        {/* name */}
        <div className="w-full flex flex-col">
          <LabelInputContainer>
            <label htmlFor="name" className="text-sm text-[#F1F2FF]">
              Full Name<sup className="text-yellow-50">*</sup>
            </label>
            <Input
              id="name"
              placeholder="Prafull Prince"
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name should be atleast of 3 characters long.",
                },
              })}
            />
            {errors.name && (
              <p className="text-caribbeangreen-400 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </LabelInputContainer>
        </div>

        {/* email */}
        <div className="w-full flex flex-col">
          <LabelInputContainer>
            <label htmlFor="email" className="text-sm text-[#F1F2FF]">
              Email<sup className="text-yellow-50">*</sup>
            </label>
            <Input
              id="email"
              placeholder="projectmaycome@gmail.com"
              type="email"
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-caribbeangreen-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </LabelInputContainer>
        </div>

        {/* passwords */}
        <div className="flex flex-col gap-5 sm:flex-row sm:gap-3">
          {/* password */}
          <div className="w-full flex flex-col">
            <LabelInputContainer>
              <label htmlFor="password" className="text-sm text-[#F1F2FF]">
                Password<sup className="text-yellow-50">*</sup>
              </label>
              <Input
                id="password"
                placeholder="Enter password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password should be atleast of 4 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password should be maximum of 20 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-caribbeangreen-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </LabelInputContainer>
          </div>

          {/* Confirm Password */}
          <div className="w-full flex flex-col">
            <LabelInputContainer>
              <label
                htmlFor="confirmPassword"
                className="text-sm text-[#F1F2FF]"
              >
                Confirm Password<sup className="text-yellow-50">*</sup>
              </label>
              <Input
                id="confirmPassword"
                placeholder="Confirm password"
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  minLength: {
                    value: 4,
                    message: "Password should be atleast of 4 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password should be maximum of 20 characters long",
                  },
                  validate: (value) => {
                    return value === passwordValue || "Password do not match";
                  },
                })}
              />
              {errors.confirmPassword && (
                <p className="text-caribbeangreen-400 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </LabelInputContainer>
          </div>
        </div>

        {/* button */}
        <button
          type="submit"
          className="bg-gradient-to-r mt-4 relative group from-yellow-25 to-yellow-50 block w-full text-black rounded-md h-10 font-medium hover:shadow-sm hover:shadow-blue-100 transition-all duration-500"
        >
          {loading ? (
            <span className="loader"></span>
          ) : (
            <p>Create account &rarr;</p>
          )}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;

export const BottomGradient = () => {
  return (
    <>
      <span className="group-hover:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx("flex flex-col space-y-1 w-full", className)}>
      {children}
    </div>
  );
};
