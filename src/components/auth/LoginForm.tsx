import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { BottomGradient, LabelInputContainer } from "./SignupForm";

// formInputTypes
interface formInputTypesLogin {
  email: string;
  password: string;
  confirmPassword: string;
}

// rafce
const LoginForm = () => {
  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInputTypesLogin>();

  // submitHandler
  const onSubmit: SubmitHandler<formInputTypesLogin> = (data: any) => {
    console.log("data", data);
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
          Log in &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
