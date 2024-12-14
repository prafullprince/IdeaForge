import { useState } from "react";
import OtpInput from "react-otp-input";
import { BottomGradient } from "./SignupForm";
import { LuRefreshCw } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const VerifyEmailForm = () => {
  // state
  const [otp, setOtp] = useState<string>("");

  return (
    <div className="w-full flex flex-col gap-4">

      {/* OTPInput */}
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderInput={(props) => (
          <input
            {...props}
            placeholder="-"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-[48px] lg:w-[56px] border-0 outline-none bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-blue-100"
          />
        )}
        containerStyle={{
          justifyContent: "space-between",
          gap: "0 6px",
        }}
      />

      {/* button */}
      <button
        className="bg-gradient-to-br mt-4 relative group from-yellow-50 to-yellow-400 block w-full text-black rounded-md h-10 font-medium hover:shadow-sm hover:shadow-blue-100 transition-all duration-500"
      >
        Create account &rarr;
        <BottomGradient />
      </button>

      {/* resend */}
      <div className="w-full flex justify-between items-center">
        <Link to={"/signup"} className="text-[#F1F2FF] font-medium flex items-center gap-2"><FaArrowLeft className="" />Back to signup</Link>
        <button className="text-[#47A5C5] font-medium flex items-center gap-1"><LuRefreshCw className="text-[#47A5C5] text-lg" />Resend it</button>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
