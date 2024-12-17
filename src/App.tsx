import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ResetPassword from './pages/ResetPassword'
import ResetPasswordToken from './pages/ResetPasswordToken'
import VerifyEmail from './pages/VerifyEmail'
import Navbar from './components/common/Navbar'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import DashboardLayoutPage from './pages/DashboardLayoutPage'
import Profile from './pages/Dashboard/Profile'
import Dashboard from './pages/Dashboard/Dashboard'
import MyCourses from './pages/Dashboard/MyCourses'
import AddCourse from './pages/Dashboard/AddCourse'
import Setting from './pages/Dashboard/Setting'

function App() {


  return (
    <div className='min-h-screen overflow-auto bg-richblack-900 text-white font-inter'>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/resetPassword/:token' element={<ResetPassword />} />
        <Route path='/resetPasswordToken' element={<ResetPasswordToken />} />
        <Route path='/verifyEmail' element={<VerifyEmail />} />

        <Route element={<DashboardLayoutPage />} >
          <Route path='/dashboard/profile' element={<Profile />} />
          <Route path='/dashboard/my-dashboard' element={<Dashboard />} />
          <Route path='/dashboard/my-courses' element={<MyCourses />} />
          <Route path='/dashboard/add-course' element={<AddCourse />} />
          <Route path='/dashboard/settings' element={<Setting />} />
        </Route>



      </Routes>
    </div>
  )
}

export default App
