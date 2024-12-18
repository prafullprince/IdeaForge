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
import { useEffect, useState } from 'react'
import { userDetails } from './services/apiCall/profile'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './slices/profileSlice'
import Spinner1 from './components/spinners/Spinner1'

function App() {

  // store
  const {token} = useSelector((state:any)=>state.auth);
  
  // hook
  const dispatch = useDispatch();

  // state
  const [loading,setLoading] = useState(false);

  // sideEffect -> userDetails
  useEffect(()=>{
    async function fetchUserDetails(){
      if(!token) return;
      setLoading(true);
      try {
        const result = await userDetails(token);
        dispatch(setUser(result));
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    }
    fetchUserDetails();
  },[token])

  if(loading) return <Spinner1 />

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
