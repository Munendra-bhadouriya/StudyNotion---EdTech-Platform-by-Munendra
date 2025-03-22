import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setCourse, setStep } from '../../../../../slices/courseSlice';
import { useForm } from 'react-hook-form';
import IconBtn from '../../../common/IconBtn';
import { FaRegEdit } from 'react-icons/fa';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

const PublishForm = () => {
  const dispatch = useDispatch(); 
  const { register, setValue, getValues, handleSubmit } = useForm();
  const { course } = useSelector((state) => state.course);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const courseStatus = course?.status; // Extract complex expression

    if (courseStatus === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, [course?.status, setValue]);  


  const handleCoursePublish = async () => {
    //check form has been updated or not
    if ((course.status === COURSE_STATUS.PUBLISHED && getValues('public') === true) ||
      (course.status === COURSE_STATUS.DRAFT && getValues('public') === false)) {
      
      //form has not been updated, no need to make an API call
      dispatch(resetCourseState());
      navigate('/dashboard/my-courses');
      return;
    }

    const formData = new FormData();
    
    formData.append('courseId', course._id);
    const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append('status', courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if (result) {
      dispatch(setCourse(result)); dispatch(resetCourseState());
      navigate('/dashboard/my-courses');
    }

    setLoading(false);
  }

  const onSubmit = async (data, event) => {
    event.preventDefault();
    handleCoursePublish();
  }

  return (
    <div className='w-full'>
        <div className='flex flex-col bg-richblack-800 w-full rounded-lg border border-richblack-600 p-6 gap-6'>
          <p className=' font-semibold text-2xl text-richblack-5'>Publish Settings</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
            <div>
              <label htmlFor='public' className='flex gap-3 items-center' >
                <input
                  type='checkbox'
                  id='public'
                  {...register('public')}
                  className=' scale-150'
                />
                <span className=''>Make this course as public</span>
              </label>
            </div>

            <div className='flex gap-4 w-full justify-start'>
              <button type='button' onClick={() => dispatch(setStep(2))}>
                Back
              </button>

              <IconBtn
                type={"submit"}
                disabled={loading}
                text={"Save Changes"} cutsomClasses={"bg-yellow-50 rounded-lg font-semibold tracking-wide text-lg text-richblack-900"}
                children={<FaRegEdit/>}
              />  
            </div>
          </form>
        </div>
    </div>
  )
}

export default PublishForm