import React, { useEffect, useState } from 'react'
import { CiStar } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import ReactStars from "react-rating-stars-component"
import { GetAvgRating } from '../../../../utils/avgRating';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../../../slices/cartSlice';

const CartItem = ({ course }) => {
    const [rating, setRating] = useState(0);
    
    useEffect(() => {
        setRating(GetAvgRating(course.ratingAndReviews));
    }, [course])

    const dispatch = useDispatch();


    return (
    
    <div className='w-full flex px-6 gap-5 rounded-lg items-center'>
        <div className='w-3/4 flex gap-5'>
            <img src={course?.thumbnail} alt='thumbnail image' className=' w-[11.56rem] h-[9.25rem] rounded-lg'/>
            <div className='flex flex-col justify-center gap-2'>
                <div className='flex flex-col'>
                    <p className='font-medium text-lg capitalize'>{course?.courseName}</p>
                    <p className='capitalize text-richblack-200'>{course?.category?.name}</p>
                </div>
                <p className=' text-richblack-400 text-sm'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                <div className='flex items-center gap-2'>
                    <span className='text-yellow-50 font-semibold text-base'>{rating}</span>  {/*Yaha pe hardcode kiya hai, instead connect it with backends api for average rating*/}
                    <ReactStars
                        key={rating}
                        count={5}
                        size={20}
                        edit={false}
                        activeColor="#ffd700"
                        emptyIcon={CiStar}
                        fullIcon={CiStar}
                        value={rating}
                    />

                    <span className='text-richblack-300 font-medium text-base'>{`(${course?.ratingAndReviews?.length}  Ratings)`}</span>
                </div>
            </div>
        </div>

        <div className='w-1/4 flex flex-col gap-5 items-center'>
            <button onClick={() => dispatch(removeFromCart(course._id))}
            className='w-fit flex items-center gap-2 rounded-lg p-3 bg-richblack-800 text-pink-200 border border-richblack-700'>
                <FaTrash />
                <span>Remove</span>
            </button>

            <p className='font-semibold text-2xl text-yellow-50'>Rs. {course?.price}</p>
        </div>
    </div>
  )
}

export default CartItem