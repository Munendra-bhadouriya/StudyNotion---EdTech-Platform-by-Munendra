import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/core/common/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from './pages/Dashboard'
import MyProfile from "./components/core/Dashboard/MyProfile";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import Catalog from "./pages/Catalog";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from './components/core/Dashboard/MyCourses'
import EditCourse from "./components/core/Dashboard/Edit Course/EditCourse";
import CourseDetails from "./pages/CourseDetails";
import Accordion from "./components/core/common/Test";
import ViewCourse from "./pages/ViewCoursePage";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Settings from "./components/core/Dashboard/Settings";
import Contact from "./pages/Contact";



function App() {

  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Accordion />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        

        <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>} />
        <Route path="/login" element={<OpenRoute><Login/></OpenRoute>} />
        <Route path="/forgot-password" element={<OpenRoute><ForgotPassword /></OpenRoute>} />
        <Route path="/update-password/:id" element={<OpenRoute><UpdatePassword /></OpenRoute>} />
        <Route path="/verify-email" element={<OpenRoute><VerifyEmail /></OpenRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route element={<PrivateRoute><Dashboard /></PrivateRoute>}>  
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/edit-profile" element={<Settings />} />
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT &&
            (
              <>
              <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>} />
              <Route path="/dashboard/cart" element={<Cart/>} />
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
            (
              <>
                <Route path="/dashboard/add-course" element={<AddCourse />} />
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>} />
              </>
            )
          }
        </Route>

        <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
          <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails/>}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
