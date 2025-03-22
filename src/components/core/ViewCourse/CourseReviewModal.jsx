import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactStars from 'react-rating-stars-component'
import IconBtn from '../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';
import { IoCloseOutline } from "react-icons/io5";

const CourseReviewModal = ({ setReviewModal }) => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const {courseEntireData} = useSelector((state) => state.viewCourse)


    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm();
    
    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, []);

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating)
    }
    
    const onSubmit = async(data) => {
        await createRating({
            courseId: courseEntireData._id,
            rating: data.courseRating,
            review: data.courseExperience,
        }, token)

        setReviewModal(false);
    }

  return (
    <div className='text-white fixed inset-0 w-full h-full flex items-center justify-center backdrop-blur-sm bg-white bg-opacity-10 z-50'>
        
        <div className='w-11/12 max-w-[700px] bg-richblack-800 rounded-lg border-2 border-richblack-600'>
            <div className='w-full flex justify-between items-center bg-richblack-700 p-6'>
                <p className=' text-lg font-medium text-richblack-5'>Add Review</p>
                {/*cross icon + uska on click add kar dena */}
                <button 
                 onClick={() => setReviewModal(false)}
                 className='text-3xl hover:text-pink-200 transition-all duration-200'
                >
                   <IoCloseOutline/>
                </button>
            </div>
            
            <div className='w-full flex flex-col gap-6 my-6'>
                <div className='w-full flex justify-center gap-3'>
                    <img src={user.image} className='w-12 rounded-full aspect-square'/>
                    <div className='flex flex-col'>
                        <p className='font-medium text-richblack-5'>{user.firstName} {user.lastName}</p>
                        <p>Posting Publicly</p>
                    </div>
                </div>
                
                <form
                      onSubmit={handleSubmit(onSubmit)}
                      className='flex flex-col items-center gap-4 w-full'
                >
                    <ReactStars
                    count={5}
                    onChange = {ratingChanged}
                    size = {32}
                    activeColor = "#ffd700" 
                    />
                    
                    <div className='flex flex-col items-start gap-[6px] w-full p-8'>
                        <label className='text-[14px] text-richblack-5 font-normal' htmlFor='courseExperience'>Add Your Experience <span className=' text-pink-200'>*</span></label>
                        
                        <textarea
                            id='courseExperience'
                            placeholder='Add Your Experience here'
                            {...register("courseExperience", {required: true})}
                              className=' p-3 bg-richblack-700 text-richblack-5 rounded-lg w-full shadow-inset-white'
                              rows={5}
                        />
                        {
                            errors.courseExperience && (
                                <span className=' text-pink-200 text-xs pt-1 tracking-wide'>
                                    Please add your Experience.
                                </span>
                            )
                        }
                    </div>
                    
                    {/*Cancel and save button */}
                    <div className='flex flex-row-reverse w-full pr-8 gap-5'>
                        <button
                            onClick={() => setReviewModal(false)}
                            className="bg-richblack-400 px-5 py-2 rounded-lg text-richblack-25 font-medium hover:scale-90 transition-all duration-150 shadow-inset-white-button"
                        >
                            Cancel
                        </button>
                        
                        <IconBtn
                            text="Save"
                            cutsomClasses="bg-yellow-50 px-5 py-2 rounded-lg text-richblue-900 font-medium hover:scale-90 transition-all duration-150 shadow-inset-white-button"
                        />
                    </div>
                </form>
            </div>
        </div>
        
    </div>
  )
}

export default CourseReviewModal