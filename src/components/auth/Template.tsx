import LoginForm from "./LoginForm";
import ResetPasswordForm from "./ResetPasswordForm";
import ResetPwdTokenForm from "./ResetPwdTokenForm";
import SignupForm from "./SignupForm";
import VerifyEmailForm from "./VerifyEmailForm";

// props type
interface TemplateProps {
  title: string;
  description1: string;
  description2: string;
  image: string;
  formType: string;
}

// template components
const Template = ({
  title,
  description1,
  description2,
  image,
  formType,
}: TemplateProps) => {
  return (
    <div className="bg-black">
      {/* box */}
      <div className="w-11/12 lg:w-[80%] mx-auto flex justify-center items-center min-h-screen">
        {/* content box */}
        <div className="flex justify-center lg:justify-between items-center gap-6 w-11/12 lg:w-[80%] mx-auto">
          {/* left */}
          <div
            className={`p-6 flex flex-col gap-4 ${
              formType === "signup" ? "lg:w-[45%]" : "max-w-lg"
            } ${
              formType === "login" ? "lg:w-[45%]" : ""
            } rounded-2xl shadow-input border-pure-greys-200 border-2 hover:border-blue-100 transition-all duration-500`}
          >
            {/* content */}
            <div className="flex flex-col gap-2">
              {/* title */}
              <p className="text-[#F1F2FF] text-3xl font-semibold text-left break-words">
                {title}
              </p>
              {/* desc */}
              <div className="flex flex-col gap-1">
                <p className="text-[#AFB2BF] text-lg">
                  {description1}
                  <span className="text-[#47A5C5] font-bold font-edu-sa">
                    {description2}
                  </span>
                </p>
              </div>
            </div>
            {/* form */}
            {formType === "signup" && <SignupForm />}
            {formType === "login" && <LoginForm />}
            {formType === "resetToken" && <ResetPwdTokenForm />}
            {formType === "resetPassword" && <ResetPasswordForm />}
            {formType === "verifyEmail" && <VerifyEmailForm />}
          </div>
          {/* right */}
          <div className="hidden lg:block">
            {formType === "signup" && (
              <img
                src={image}
                alt="signup"
                className="w-[300px] h-[300px] xl:w-[400px] xl:h-[400px] 2xl:w-[585px] 2xl:h-[531px] rounded-lg shadow-custom shadow-blue-100"
              />
            )}
            {formType === "login" && (
              <img
                src={image}
                alt="login"
                className="w-[300px] h-[300px] xl:w-[400px] xl:h-[400px] 2xl:w-[500px] 2xl:h-[500px] rounded-lg shadow-custom shadow-blue-100"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
