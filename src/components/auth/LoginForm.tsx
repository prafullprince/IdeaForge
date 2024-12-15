import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { LabelInputContainer } from "./SignupForm";
import { loginApi } from "../../services/apiCall/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

// formInputTypesLogin
interface formInputTypesLogin {
  email: string;
  password: string;
}

// rafce
const LoginForm = () => {

  // hook
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInputTypesLogin>();

  // state
  const [loading,setLoading] = useState(false);

  // submitHandler -> login
  const onSubmit: SubmitHandler<formInputTypesLogin> = async (data: any) => {
    setLoading(true);
    try {
      // loginApiCall
      await loginApi(data,navigate,dispatch);

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
              })}
            />
            {errors.email && (
              <p className="text-caribbeangreen-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </LabelInputContainer>
        </div>

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

        {/* button */}
        <button
          type="submit"
          className="bg-gradient-to-br mt-4 relative group from-yellow-25 to-yellow-50 block w-full text-black rounded-md h-10 font-medium hover:shadow-sm hover:shadow-blue-100 transition-all duration-500"
        >
          {loading ? <span className="loader"></span> : <p>Log in &rarr;</p>}
        </button>
      </form>

      {/* forgot,signup */}
      <div className="w-full flex justify-between">
        <Link to={"/signup"} className="flex items-center gap-2 text-sm text-caribbeangreen-100"><FaArrowLeftLong className="text-lg font-semibold" />Signup</Link>
        <Link to={"/resetPasswordToken"} className="text-[#47A5C5] text-sm font-medium">Forgot password</Link>
      </div>
    </div>
  );
};

export default LoginForm;
