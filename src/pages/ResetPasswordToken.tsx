import Template from "../components/auth/Template"


const ResetPasswordToken = () => {
  return (
    <Template 
        title="Reset your password"
        description1="Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
        description2=""
        formType="resetToken"
        image=""
    />
  )
}

export default ResetPasswordToken
