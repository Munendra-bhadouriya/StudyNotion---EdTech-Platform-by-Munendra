import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../common/IconBtn';
import { MdAddCircleOutline, MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import toast from 'react-hot-toast';
import { updateSection } from '../../../../../services/operations/courseDetailsAPI';
import { createSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse, setStep, setEditCourse } from '../../../../../slices/courseSlice'
import NestedView from './NestedView';
import { MdKeyboardArrowLeft } from "react-icons/md";
import Button from '../../../Home Page/Button';

const CourseBuilderForm = () => {

    const { register, setValue, formState: { errors }, handleSubmit } = useForm();
    const [editSectionName, setEditSectionName] = useState(null);
    const { course} = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const onSubmit = async (data) => {
        
        let result;

        if (editSectionName) {
            //we are editing the section name
            result = await updateSection({
                sectionName: data.sectionName,
                sectionId: editSectionName,
                courseId: course._id,
            }, token)
            console.log("PRINTING RESULT>>>>>", result);
        }
        else {
            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id,
            }, token)
            console.log("PRINTING RESULT>>>>>", result);
        }

        //update value
        if (result) {
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", "");
        }

    }

    const cancelEdit = () => {
        setEditSectionName(false);
        setValue("sectionName", "");
    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const goNext = () => {
        if (course.courseContent.length === 0) {
            toast.error("Please add atleast one section.");
            return;
        }

        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Please add atleast one lecture in each section");
            return;
        }

        //if everything is good     
        dispatch(setStep(3));
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {

        if (editSectionName === sectionId) {
            cancelEdit();
            return;
        }

        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    }

  return (
    <div className='flex flex-col items-start w-full rounded-lg bg-richblack-800 p-6 gap-[1.625rem] border border-richblack-600 font-inter'>
        <p className=' font-semibold text-2xl'>Course Builder</p>
        
          <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-[1.625rem]'>
              <div className='flex flex-col items-start w-full gap-[8px]'>
                  <label htmlFor='sectionName' className=' text-[14px] text-richblack-5 font-normal'>Section Name <span className=' text-pink-200'>*</span></label>
                  <input
                      id='sectionName'
                      placeholder='Add a section to build your course'
                      {...register('sectionName', { required: true })}
                      className=' p-3 bg-richblack-700 text-richblack-5 rounded-lg w-full shadow-inset-white'
                  />
                  {
                    errors.sectionName && (
                        <span className=' text-pink-200 text-xs ml-2 tracking-wide'>Section Name is required</span>
                    )
                  }
              </div>

              <div className='flex w-full items-end'>
                  <IconBtn
                      type='Submit'
                      text={editSectionName ? "Edit Section Name" : "Create Section"}
                      
                      cutsomClasses={"text-yellow-50 border border-yellow-50 rounded-lg "}
                  >
                      <MdAddCircleOutline className='text-yellow-50 text-lg'/>
                  </IconBtn>
                  {
                      editSectionName && (
                          <button
                            type='Submit'
                            onClick={cancelEdit}
                            className=' text-sm text-richblack-300 underline ml-5 hover:text-richblack-100 transition-all duration-150'
                          >
                              Cancel Edit
                          </button>
                      )
                  }
              </div>
          </form>

          {
            course?.courseContent?.length > 0 && (
            <NestedView handleChangeEditSectionName = {handleChangeEditSectionName}/>
            )
          }

          <div className='flex gap-4 w-full justify-end'>
              <div onClick={() => goBack()}>
                <Button
                    active={false}
                    customClasses={"bg-richblack-900"}
                >
                    <div className='flex items-center gap-1'>
                        <MdKeyboardArrowLeft/>
                        Back
                    </div>
                </Button>
              </div>
              <div onClick={() => goNext()}>
                <Button
                    active={true}
                >
                    <div className='flex items-center gap-1'>
                        Next
                        <MdKeyboardArrowRight/>
                    </div>
                </Button>
              </div>
          </div>
    </div>
  )
}

export default CourseBuilderForm