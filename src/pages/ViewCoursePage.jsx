import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSlidebar from '../components/core/ViewCourse/VideoDetailsSlidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(null);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpecificDetails = async () => {
            const courseData = await getFullDetailsOfCourse({courseId: courseId}, token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));

            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures +=  sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures));
        }

        setCourseSpecificDetails();
    }, [])

  return (
    <div className='w-full flex flex-col relative'>
        <div className='relative w-full flex min-h-[calc(100vh - 3.5rem)] border-b border-richblack-600'>
            <VideoDetailsSlidebar setReviewModal={setReviewModal}/>
            
            <div className='w-full h-[calc(100vh - 3.5rem)] overflow-auto'>
              <Outlet/>
            </div>
            
        </div>
        {
            reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>
        }
    </div>
  )
}

export default ViewCourse