import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import { GetAvgRating } from '../utils/avgRating';
import ConfirmationModal from '../components/core/common/ConfirmationModal';
import RatingStar from '../components/core/common/RatingStar';
import { PiInfo } from "react-icons/pi";
import { formatDate } from '../services/formatDate';
import { FiGlobe } from "react-icons/fi";
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import Markdown, { ReactMarkdown } from "react-markdown"
import CourseAccordianBar from '../components/core/Course/CourseAccordianBar';
import Footer from '../components/core/common/Footer';

const CourseDetails = () => {

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const { cart } = useSelector((state) => state.cart);

  const [courseData, setCourseData] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);


  useEffect(() => {
    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        console.log("PRINTING RESULTTTTTTTTTTTT", result)
        setCourseData(result);
      }
      catch (error) {
        console.log("Could not fetch course details.");
      }
    }
    getCourseFullDetails();
  }, [courseId]);



  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
    setAvgReviewCount(count);
  }, [courseData]);


  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleAccordion = (index) => {
    setOpenIndexes((prev) => prev.includes(index) ? prev.filter((i) => i != index) : [...prev, index]);
  };

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  
  useEffect(() => {
    let lectures = 0;

    courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures);
  }, [courseData]);


    
  const handleBuyCourse = () => {
    if (token) {
        buyCourse(token, [courseId], user, navigate, dispatch, cart, false);
        return;
    }
    setConfirmationModal({
      text1: "You are not logged in.",
      text2: "Please log in to purchase this course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null)
    })
  }

  if (loading || !courseData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!courseData.success) {
    return <div>Error</div>
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
    category,
  } = courseData?.data?.courseDetails

  return (
    <div className='w-full flex flex-col items-center text-white gap-8'>
      
      <div className='relative w-full'>
          <div className='w-full bg-richblack-800 flex justify-center'>
          
            <div className='w-11/12 max-w-maxContent flex flex-col py-8 gap-3'>
              <p className='flex gap-2 capitalize text-richblack-300'><span>Home</span> <span>/</span>  <span>Learning</span>  <span>/</span> <span className=' text-yellow-50'>{`${category.name}`}</span></p>

              <p className=' font-medium text-3xl text-richblack-5'>{courseName}</p>
              <p className=' font-normal text-sm text-richblack-200'>{courseDescription}</p>

              <div className='flex gap-2 items-center'>
                <p className=' font-semibold text-lg text-yellow-50'>{avgReviewCount}</p>
                <RatingStar Review_Count={avgReviewCount} Star_Size={22}/>
                <p className=' text-richblack-25 text-base font-normal'>{`(${ratingAndReviews.length} ratings)`}</p>
                <p className=' text-richblack-25 text-base font-normal'>{`${studentsEnrolled.length} students`}</p>
              </div>

              <p className=' text-richblack-25 text-base font-normal'>Created by {instructor.firstName + " " + instructor.lastName}</p>
              <div className='flex gap-x-4 items-center text-richblack-25 text-base font-normal'>
                <div className='flex items-center gap-x-2'>
                  <PiInfo className=' text-lg'/>
                  <p>Created at {formatDate(createdAt)}</p>
                </div>
                
                <div className='flex items-center gap-x-2'>
                  <FiGlobe/>
                  English
                </div>
              </div>
            </div>
            
          </div>
  
          
          <div className=' w-1/3 max-w-[410px] absolute top-8 right-[138px]'>
            <CourseDetailsCard course={courseData?.data?.courseDetails} 
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse = {handleBuyCourse}
            />
          </div>
      </div>

      <div className='w-11/12 max-w-maxContent flex flex-col gap-8'>

        <div className='flex flex-col gap-3 border border-richblack-700 p-8 max-w-[810px]'>
          <div className='flex flex-col gap-3'>
            <p className='text-richblack-5 font-medium text-3xl'>What you'll learn</p>
            <div className='flex flex-col gap-2 text-sm font-medium text-richblack-50'>
              <Markdown>{whatYouWillLearn}</Markdown>
            </div>
          </div> 
        </div>

        <div className='w-full flex flex-col gap-4 max-w-[810px]'>
          <div className='flex flex-col gap-2 w-full'>
            <div className=' text-richblack-5 text-2xl font-semibold'>Course Content</div>

            <div className='flex w-full justify-between'>
              <div className='flex gap-3 text-richblack-50 text-sm font-normal'>
                <span>{courseContent.length} sections</span>
                <span>•</span>
                <span>{totalNoOfLectures} lectures</span>
                <span>•</span>
                <span>{courseData?.data?.totalDuration} total length</span>
              </div>

              <div className='text-yellow-50 text-sm font-medium'>
                <button onClick={() => setOpenIndexes([])}>Collapse all sections</button>
              </div>
            </div>
          </div>

          <div className='w-full border border-richblack-600'>
            {
              courseContent?.map((item, index) => {
                return <CourseAccordianBar
                  course={item}
                  key={index}
                  isActive={openIndexes.includes(index)}
                  onClick = {() => {toggleAccordion(index)}}
                />
              })
            }
          </div>
            
        </div>

        <div className='w-full flex flex-col gap-4 max-w-[810px]'>
          <p className=' text-richblack-5 text-2xl font-semibold'>Author</p>
          <div className=' flex gap-3 items-center'>
            <img src={instructor.image} className=' w-[3.25rem] aspect-square rounded-full'/>
            <p className=' text-base font-medium text-richblack-5'>{instructor.firstName} {instructor.lastName}</p>
          </div>
          <div className=' text-sm font-normal text-richblack-50'>
            {instructor.additionalDetails.about}
          </div>
        </div>
        
      </div>
      
      <Footer/>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default CourseDetails