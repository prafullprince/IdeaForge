import { BottomGradient, LabelInputContainer } from "./SignupForm";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";


// formInputTypes
interface formInputTypesTokenReset {
  email: string;
}


// rafce
const ResetPasswordTokenForm = () => {

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInputTypesTokenReset>();

  // submitHandler
  const onSubmit: SubmitHandler<formInputTypesTokenReset> = (data: any) => {
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
                minLength: {
                    value: 1,
                    message: "Invalid Email"
                }
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
          Reset Password &rarr;
          <BottomGradient />
        </button>

      </form>
    </div>
  );
};

export default ResetPasswordTokenForm;
