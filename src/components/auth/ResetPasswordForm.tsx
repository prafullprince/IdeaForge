import { BottomGradient, LabelInputContainer } from "./SignupForm";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";

// formInputTypes
interface formInputTypesTokenReset {
  newPassword: string;
  confirmNewPassword: string;
}

// rafce
const ResetPasswordForm = () => {
  // useForm
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<formInputTypesTokenReset>();

  // submitHandler
  const onSubmit: SubmitHandler<formInputTypesTokenReset> = (data: any) => {
    console.log("data", data);
  };
  const passwordValue = watch("newPassword");

  return (
    <div className="flex flex-col gap-4">
      {/* form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5 mt-6"
      >

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
              {...register("newPassword", {
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
            {errors.newPassword && (
              <p className="text-caribbeangreen-400 text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </LabelInputContainer>
        </div>

        {/* Confirm Password */}
        <div className="w-full flex flex-col">
          <LabelInputContainer>
            <label htmlFor="confirmPassword" className="text-sm text-[#F1F2FF]">
              Confirm Password<sup className="text-yellow-50">*</sup>
            </label>
            <Input
              id="confirmPassword"
              placeholder="Confirm password"
              type="password"
              {...register("confirmNewPassword", {
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
            {errors.confirmNewPassword && (
              <p className="text-caribbeangreen-400 text-sm mt-1">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </LabelInputContainer>
        </div>

        {/* button */}
        <button
          type="submit"
          className="bg-gradient-to-br mt-4 relative group from-yellow-50 to-yellow-100 block w-full text-black rounded-md h-10 font-medium hover:shadow-sm hover:shadow-blue-100 transition-all duration-500"
        >
          Reset Password &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
