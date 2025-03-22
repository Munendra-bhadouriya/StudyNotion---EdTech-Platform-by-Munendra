import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import IconBtn from '../../../common/IconBtn'
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { FaRegEdit } from "react-icons/fa";
import ChipInput from './ChipInput'
import Upload from './Upload';
import Button from '../../../Home Page/Button';
const CourseInformationForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm();

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }

      setLoading(false);
    }

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    getCategories();  
  }, [editCourse, course, setValue])

  const isFormUpdated = () => {
    const currentValues = getValues();
    console.log("Printing current valuessss", currentValues);
    console.log("Printing course", course)
    if (currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== Number(course.price) ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category._id ||
      currentValues.courseRequirements.toString() !== course.instructions.toString()
    ) {
      return true;
    }
    else {
      return false;
    }
  }

  //handles next button click
  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }

        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if (currentValues.courseCategory !== course.category._id) {
          formData.append("category", data.courseCategory);
        }

        if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions", JSON.stringify(data.courseRequirements));
        }

        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }

        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      }
      else {
        toast.error("No changes made to the form.");
      }
      return;
    }


    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    
    console.log("PRINTING RESULLLLTTTTTT......", result);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  }

  
  // add htmlFor all
  return (
    <form
      onSubmit={handleSubmit(onSubmit)} 
      className='rounded-md bg-richblack-800 p-6 space-y-8 border border-richblack-400 w-full'
    >
      <div className='flex flex-col items-start w-full gap-[8px]'>
        <label htmlFor='courseTitle' className=' text-[14px] text-richblack-5 font-normal'>Course Title<sup className='text-pink-200'> *</sup></label>
        <input
          id = 'courseTitle'
          placeholder='Enter Course Title'
          {...register("courseTitle", { required: true })}
          className=' p-3 bg-richblack-700 text-richblack-5 rounded-lg w-full shadow-inset-white'
        />
        {
          errors.courseTitle && (
            <span className=' text-pink-200 text-xs ml-2 tracking-wide'>Course Title is required**</span>
          )
        }
      </div>

      <div className='flex flex-col items-start w-full gap-[8px]'>
        <label htmlFor='courseShortDesc' className=' text-[14px] text-richblack-5 font-normal'>Course Short Description<sup className=' text-pink-200'> *</sup></label>
        <textarea
          id='courseShortDesc'
          placeholder='Enter Description'
          {...register("courseShortDesc", { required: true })}
          className=' p-3 bg-richblack-700 text-richblack-5 rounded-lg w-full min-h-[140px] shadow-inset-white'
        />
        {
          errors.courseShortDesc && (
            <span className=' text-pink-200 text-xs ml-2 tracking-wide'>Course Description is required**</span>
          )
        }
      </div>

      <div className='flex flex-col items-start w-full gap-[8px] relative'>
        <label htmlFor='coursePrice' className=' text-[14px] text-richblack-5 font-normal'>Course Price<sup className=' text-pink-200'> *</sup></label>
        <div className='relative w-full'>
          <input
            id='coursePrice'
            placeholder='Enter Course Price'
            {...register("coursePrice", { required: true, valueAsNumber: true })}
            className=' py-3 px-9 bg-richblack-700 text-richblack-5 rounded-lg w-full shadow-inset-white'
          />
          <HiOutlineCurrencyRupee className='absolute text-[22px] top-1/2 translate-y-[-50%] translate-x-[30%] text-richblack-400 '/>
        </div>
        {
          errors.coursePrice && (
            <span className=' text-pink-200 text-xs ml-2 tracking-wide'>Course Price is required**</span>
          )
        }
      </div>
      
      <div className='flex flex-col items-start w-full gap-[8px]'>
        <label htmlFor='courseCategory' className=' text-[14px] text-richblack-5 font-normal'>Course Category<span className='text-pink-200'> *</span></label>
        <select
          id='courseCategory'
          defaultValue=''
          {...register("courseCategory", { required: true })}
          className=' p-3 bg-richblack-700 text-richblack-5 rounded-lg w-full shadow-inset-white'
        >
          <option value="" disabled>Choose a category</option>

          {
            !loading && courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>{category?.name}</option>
            ))
          }
        </select>
        {
          errors.couseCategory && (
            <span className=' text-pink-200 text-xs ml-2 tracking-wide'>Course Category is required</span>
          )
        }
      </div>

      {/*create a custom component for handling tags input*/}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter tags and press enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues = {getValues}
      />
      
      {/*create a custom component for uplaoding and showing preview of media*/}
      <Upload
        name= "courseImage"
        label = "Course Thumbnail"
        register = {register}
        errors = {errors}
        setValue={setValue}
        editData={editCourse ? course.thumbnail : null}
      />

      {/*Benefits of the course*/}
      <div className='flex flex-col items-start w-full gap-[8px]'>
        <label htmlFor='courseBenefits' className=' text-[14px] text-richblack-5 font-normal'>Benefits of the course <span className='text-pink-200'>*</span></label>
        <input
          id='courseBenefits'
          placeholder='Enter Benefits of the course'
          {...register("courseBenefits", { required: true })}
          className=' p-3 bg-richblack-700 text-richblack-5 rounded-lg w-full shadow-inset-white'
        />
        {
          errors.courseBenefits && (
            <span className=' text-pink-200 text-xs ml-2 tracking-wide'>Course Benefits is required**</span>
          )
        }
      </div>

      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues = {getValues}
      />


      {/* <div className='w-full flex justify-end gap-4'>
        {
          editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              className='flex items-center gap-x-2 bg-richblack-300 rounded-lg '
            >
              Continue Without Saving
            </button>
          )
        }
        <IconBtn
          text={!editCourse ? "Next" : "Save Changes"} cutsomClasses={"bg-yellow-50 rounded-lg font-semibold tracking-wide text-lg text-richblack-900"}
          children={<FaRegEdit/>}
        />
      </div> */}

      <div className='flex gap-4 w-full justify-end'>
          {
            editCourse && (
              <div onClick={() => dispatch(setStep(2))}>
                <Button
                    active={false}
                    customClasses={"bg-richblack-900"}
                >
                  Continue Without Saving
                </Button>
              </div>
            )
          }
          <IconBtn
            text={!editCourse ? "Next" : "Save Changes"} cutsomClasses={"bg-yellow-50 rounded-lg font-semibold tracking-wide text-lg text-richblack-900"}
            children={<FaRegEdit/>}
          />  
      </div>
    </form>
  )
}

export default CourseInformationForm