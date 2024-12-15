import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ResetPassword from './pages/ResetPassword'
import ResetPasswordToken from './pages/ResetPasswordToken'
import VerifyEmail from './pages/VerifyEmail'

function App() {


  return (
    <div className='min-h-screen overflow-auto bg-richblack-900 text-white font-inter'>
      

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/resetPassword/:token' element={<ResetPassword />} />
        <Route path='/resetPasswordToken' element={<ResetPasswordToken />} />
        <Route path='/verifyEmail' element={<VerifyEmail />} />
      </Routes>
    </div>
  )
}

export default App
