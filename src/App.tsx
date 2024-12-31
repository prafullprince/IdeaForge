import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordToken from "./pages/ResetPasswordToken";
import VerifyEmail from "./pages/VerifyEmail";
import Navbar from "./components/common/Navbar";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import DashboardLayoutPage from "./pages/DashboardLayoutPage";
import Profile from "./pages/Dashboard/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyCourses from "./pages/Dashboard/MyCourses";
import AddCourse from "./pages/Dashboard/AddCourse";
import Setting from "./pages/Dashboard/Setting";
import { useEffect, useState } from "react";
import { userDetails } from "./services/apiCall/profile";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./slices/profileSlice";
import Spinner1 from "./components/spinners/Spinner1";
import PrivateRoute from './components/auth/PrivateRoute';
import CatalogPage from "./pages/CatalogPage";
import CoursePageDetails from "./pages/CoursePageDetails";
import CartPage from "./components/Cart/CartPage";
import EnrolledCourse from "./pages/EnrolledCourse";
import WatchCourse from "./pages/WatchCourse";
import LectureContent from "./components/Watch/LectureContent";
import UserProfile from "./pages/UserProfile";
import SearchResult from "./pages/SearchResult";
import PurchasedHistory from "./pages/Dashboard/PurchasedHistory";

// import { jwtDecode } from "jwt-decode";

// interface IPayload {
//   email: string;
//   accountTpe: string;
//   exp: number;
//   iat: number;
// }

function App() {
  // store
  const { token } = useSelector((state: any) => state.auth);

  // hook
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // state
  const [loading, setLoading] = useState(false);

  // sideEffect -> userDetails
  useEffect(() => {
    async function fetchUserDetails() {
      if (!token) {
        localStorage.removeItem("token");
        return;
      }
      setLoading(true);
      try {
        const result = await userDetails(token);
        dispatch(setUser(result));
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetchUserDetails();
  }, [token]);

  // useEffect(() => {
  //   const handleLogout = () => {
  //     localStorage.removeItem("token");
  //     navigate("/login");
  //   };

  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     try {
  //       const decoded: IPayload = jwtDecode(token);
  //       const currentTime = Date.now() / 1000; // Current time in seconds

  //       if (decoded?.exp < currentTime) {
  //         // Token is already expired
  //         handleLogout();
  //       } else {
  //         // Token is valid, set a timeout for automatic logout
  //         const diff = (decoded.exp - currentTime) * 1000; // Convert to milliseconds
  //         console.log(diff)
  //         const timeout = setTimeout(handleLogout, diff);

  //         // Clear the timeout if the component unmounts or token changes
  //         return () => clearTimeout(timeout);
  //       }
  //     } catch (error) {
  //       console.error("Invalid token:", error);
  //       handleLogout();
  //     }
  //   }
  // }, [navigate]);

  if (loading) return <Spinner1 />;

  return (
    <div className="min-h-screen overflow-auto bg-richblack-900 text-white font-inter">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/resetPasswordToken" element={<ResetPasswordToken />} />
        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route path="/catalog/:catalogName" element={<CatalogPage />} />
        <Route path="/course/details/:courseId" element={<CoursePageDetails />} />
        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="/watch/:courseId" element={<WatchCourse />} /> */}

        <Route path="/profile/:profileId" element={<UserProfile />} />
        <Route path="/searchResults" element={<SearchResult />} />

        <Route 
          element={<PrivateRoute>
            <WatchCourse />
          </PrivateRoute>}
        >
          <Route path="/watch-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<LectureContent />} />
        </Route>

        <Route
          element={
            <PrivateRoute>
              <DashboardLayoutPage />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/my-dashboard" element={<Dashboard />} />
          <Route path="/dashboard/my-courses" element={<MyCourses />} />
          <Route path="/dashboard/add-course" element={<AddCourse />} />
          <Route path="/dashboard/settings" element={<Setting />} />
          <Route path="/dashboard/enrolled-courses" element={<EnrolledCourse />} />
          <Route path="/dashboard/purchase-history" element={<PurchasedHistory />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
