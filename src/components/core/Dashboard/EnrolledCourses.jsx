import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

    const [enrolledCourses, setEnrolledCourses] = useState();
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const getEnrolledCourses = async() => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }
        catch (error) {
            console.log("Unable to fetch enrolled courses.");
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, []);
    
  return (
    <div className='w-full flex flex-col items-center mx-auto max-w-[1162px]'>
    {
        !enrolledCourses ? (
            <div className='text-white'>Loading...</div>
        ) : !enrolledCourses.length ? (<p className='text-white'>You have not enrolled in any course yet</p>) :
        (
        <div className='w-full '>
            {/* All pending completed tab left */}
            <div></div>
            
            
            <div className='w-full rounded-lg mb-4'>
                {/* Headings */}
                <div className='w-full flex items-start justify-between border-b border-richblack-700 bg-richblack-700 rounded-t-lg p-4 text-richblack-50 font-medium text-sm'>
                    <p className='w-[40%]'>Course Name</p>
                    <p className='w-1/4 '>Duration</p>
                    <p className='w-1/5 '>Progress</p>
                </div>
                
                {/* Course Names */}
                <div className='flex flex-col w-full bg-richblack-900'>
                    {
                        enrolledCourses.map((course, index) => (
                            <div key={index} className='w-full flex items-start justify-between border border-richblack-700 p-4 text-richblack-50 font-medium text-sm'>
                                <div
                                    onClick={() => {
                                    navigate(
                                        `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                    )
                                    }}

                                    className='flex w-[40%] gap-5 cursor-pointer'
                                
                                >
                                    <img src={course.thumbnail} className='w-[3.25rem] aspect-square rounded-lg'/>
                                    <div className='gap-1 flex flex-col items-start justify-center'>
                                        <p className=' font-medium text-base text-richblack-5'>{course.courseName}</p>
                                        <p className=' font-normal text-base text-richblack-300'>{course.courseDescription}</p>
                                    </div>
                                </div>

                                <div className='w-1/4 self-center font-medium text-base text-richblack-50'>
                                    {
                                        course?.totalDuration
                                    }
                                </div>

                                <div className='w-1/5 flex flex-col gap-2 self-center'>
                                    <p className=' font-semibold text-xs text-richblack-50'>{ course.progressPercentage === 100 ? "Completed" : `Progress : ${course.progressPercentage || 0}%`}</p>
                                    <ProgressBar
                                        completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                        bgColor={course.progressPercentage === 100 ? "#06D6A0" : "#47A5C5"}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        )
    }    
    
        
    </div>
  )
}

export default EnrolledCourses