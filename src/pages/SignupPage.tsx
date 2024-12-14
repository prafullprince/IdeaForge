import React from "react"
import Template from "../components/auth/Template"
import signupImage from "../assets/Images/aboutus3.webp";


const SignupPage: React.FC = () => {
  return (
    <Template 
        title="Join the millions learning to code with StudyNotion for free"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={signupImage}
        formType= "signup"
    />
  )
}

export default SignupPage
