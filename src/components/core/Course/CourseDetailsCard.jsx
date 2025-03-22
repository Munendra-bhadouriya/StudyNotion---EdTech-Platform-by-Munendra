import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { GoTriangleRight } from "react-icons/go";
import { IoShare } from "react-icons/io5";
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';

const CourseDetailsCard = ({ course, handleBuyCourse, setConfirmationModal }) => {
    
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const {
        thumbnail,
        price,
        studentsEnrolled,
        instructions,
    } = course;

    const handleShare = () => {
        copy(window.location.href)
        toast.success("Link copied to clipboard")
    } 

    const handleAddToCart = () => {
        if (user && user.account_type === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an instructor, you can't buy a course.");
            return;
        }
        if (token) {
            dispatch(addToCart(course));
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

  return (
    <div className='w-full flex flex-col rounded-lg bg-richblack-700'>
        <img src={thumbnail} className='max-h-[300px] min-h-[180px] w-full object-cover overflow-hidden rounded-t-lg'/>
        
        <div className=' p-6 flex flex-col gap-4 w-full'>
            <p className=' text-richblack-5 text-3xl font-bold'>Rs. {price}</p>
            
            <div className='flex flex-col gap-3 w-full items-center'>
                <button
                    onClick={
                        user && studentsEnrolled.includes(user?._id)
                        ? () => navigate("/dashboard/enrolled-courses")
                        : () => handleBuyCourse()
                    }
                    className='w-full py-3 px-6 bg-yellow-50 rounded-lg text-richblue-900 font-medium text-base shadow-inset-white-button '
                >
                    {
                        user && studentsEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"
                    }
                </button>
                {
                    (!studentsEnrolled.includes(user?._id)) && (
                        <button
                        onClick= {handleAddToCart}
                        className='w-full py-3 px-6 bg-richblue-900 rounded-lg text-richblack-5 font-medium text-base shadow-inset-white-button '
                        >
                            Add to Cart
                        </button>
                    )
                  }
                <p className=' text-richblack-25 text-sm font-normal'>30-Days Money-Back Guarantee</p>
                
                <div className='flex flex-col gap-2 items-start w-full'>
                    <p className=' text-base font-medium text-richblack-5'>This course includes :</p>
                    {console.log("INSTRUCTIONS...", instructions)}
                    <div className='flex flex-col gap-2'>
                        {
                            instructions.map((item, index) => {
                                return <div key={index} className='flex items-center gap-1 text-base font-medium text-caribbeangreen-100'>
                                    <GoTriangleRight />
                                    {item}
                                </div>
                            })
                        }
                    </div>
                </div>
                
                <div className='flex items-center cursor-pointer w-full justify-center gap-1 font-medium text-base text-yellow-50' onClick={handleShare}>
                    <IoShare/>
                    <p>Share</p>
                </div>
            </div>
            
        </div>
        
        
    </div>
  )
}

export default CourseDetailsCard