import { LabelInputContainer } from "./SignupForm";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { resetPasswordTokenApi } from "../../services/apiCall/auth";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

// formInputTypes
interface formInputTypesTokenReset {
  email: string;
}

// rafce
const ResetPasswordTokenForm = () => {
  
  // state
  const [loading, setLoading] = useState(false);

  // useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formInputTypesTokenReset>();

  // submitHandler
  const onSubmit: SubmitHandler<formInputTypesTokenReset> = async (
    data: any
  ) => {
    setLoading(true);
    try {
      // apiCall - resetPwdToken
      await resetPasswordTokenApi(data.email);
      reset({
        email:""
      })

    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5 mt-6"
      >
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
                minLength: {
                  value: 1,
                  message: "Invalid Email",
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

        {/* button */}
        <button
          type="submit"
          className="bg-gradient-to-br mt-4 relative group from-yellow-50 to-yellow-100 block w-full text-black rounded-md h-10 font-medium hover:shadow-sm hover:shadow-blue-100 transition-all duration-500"
        >
          {loading ? (
            <span className="loader"></span>
          ) : (
            <p>Reset Password &rarr;</p>
          )}
        </button>
      </form>
      <Link to={"/login"} className="flex items-center gap-2 text-sm text-caribbeangreen-100"><FaArrowLeftLong className="text-lg font-semibold" />Login</Link>
    </div>
  );
};

export default ResetPasswordTokenForm;
