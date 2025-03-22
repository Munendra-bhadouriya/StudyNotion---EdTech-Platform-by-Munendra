import React, { useEffect, useState } from 'react'
import RatingStar from '../common/RatingStar'
import { Link } from 'react-router-dom'
import {GetAvgRating} from '../../../utils/avgRating'
const Course_Card = ({course, Height}) => {
    
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(() => {

        const avgRatingFunction = () => {
            console.log("Course", course.ratingAndReviews)
            const count = GetAvgRating(course?.ratingAndReviews);
            console.log("Course", count)
            setAvgReviewCount(count);
        }

        avgRatingFunction();
    }, [course])

  return (
    <div className='w-full'>
        <Link to={`/courses/${course._id}`}>
            <div className='w-full flex flex-col gap-5'>
                <div >
                    <img src={course?.thumbnail} alt='course ka thumbnail'
                        className={`${Height} w-[98%] rounded-xl object-cover`}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='text-lg font-medium text-richblack-5 capitalize'>{course?.courseName}</p>
                    <p className='text-richblack-300'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    
                    <div className='flex items-center gap-1'>
                        <span className=' font-semibold text-yellow-50'>{avgReviewCount || 0}</span>
                        <RatingStar Review_Count={avgReviewCount}/>
                        <span className='text-richblack-300'>{`(${course?.ratingAndReviews?.length} Reviews)`}</span>
                    </div>
                    <p className='font-semibold text-xl text-richblack-5'>Rs. {course?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_Card