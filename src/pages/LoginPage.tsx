import Template from '../components/auth/Template'
import loginImg from '../assets/Images/aboutus2.webp'


const LoginPage = () => {
  return (
    <Template 
        title="Welcome Back"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={loginImg}
        formType= "login"
    />
  )
}

export default LoginPage
