import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import { RxCross2 } from "react-icons/rx";
import Upload from '../CourseFormation/Upload'
import IconBtn from '../../../common/IconBtn';
import { useState } from 'react';
import { RiEditBoxLine } from "react-icons/ri";

const SubSectionModal = ({
    modalData,
    setModalData,
    view = false,
    edit = false,
    add = false,
}) => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors}
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData?.title || "");
            setValue("lectureDesc", modalData?.description || "");
            setValue("lectureVideo", modalData?.videoUrl || "");
        }
    }, [view, edit, modalData, setValue]);

    const isFormUpdated = () => {
        const currentValues = getValues();

        if (currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    const handleEditSubSection = async () => {

        const currentValues = getValues();
        const formData = new FormData();
        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }
        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.lectureVideo);
        }

        setLoading(true);
        //API CALL
        const result = await updateSubSection(formData, token);

        if (result) {
            const updatedCourseContent = course.courseContent.map((section) => section._id === modalData.sectionId ? result : section);
            
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    }

    const onSubmit = async (data) => {
        
        if (view) {
            return;
        }

        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No changes made."); 
            }
            else {
                handleEditSubSection();
            }
            return;
        }

        const formData = new FormData()
        formData.append("sectionId", modalData)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("video", data.lectureVideo)
        setLoading(true);
        
        const result = await createSubSection(formData, token)
        console.log("RESULTTT??? ", result);
        if (result) {
        // update the structure of course
        const updatedCourseContent = course.courseContent.map((section) =>
            section._id === modalData ? result : section
        )
        
        const updatedCourse = { ...course, courseContent: updatedCourseContent }
        dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false)
        
    }


  return (
    <div className='fixed inset-0 w-full h-full flex items-center justify-center backdrop-blur-sm bg-white bg-opacity-10 z-50'>
        <div className='w-11/12 max-w-[665px] bg-richblack-800 rounded-lg border-2 border-richblack-600 overflow-y-auto max-h-[90vh] scrollbar-hide'>
            <div className='w-full bg-richblack-500'>
                <div className='w-full flex items-center justify-between py-4 px-6'>
                    <p className='font-medium text-lg'>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                    <button 
                        onClick={() => (!loading ? setModalData(null) : {})}
                        className=' text-2xl text-richblack-100 hover:text-richblack-5 transition-all duration-150'  
                      >
                        <RxCross2/>
                    </button>
                </div>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className='w-full p-6 flex flex-col gap-6 items-end' >
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl: null}
                        editData={edit ? modalData.videoUrl: null}
                    />
                    
                    <div className='flex flex-col items-start w-full gap-[8px]'>
                      <label htmlFor='lectureTitle' className=' text-[14px] text-richblack-5 font-normal'>Lecture Title {!view && (<span className=' text-pink-200'>*</span>)}</label>
                        <input
                          id='lectureTitle'
                          placeholder='Enter Lecture Title'
                          {...register("lectureTitle", { required: true })}
                          className=' p-3 bg-richblack-700 text-richblack-5 rounded-lg w-full shadow-inset-white'
                          disabled = {loading || view}
                        />
                        {
                          errors.lectureTitle &&
                          (
                              <span className="ml-2 text-xs tracking-wide text-pink-200">Lecture Title is required**</span>
                          )
                        }
                    </div>
                    <div className='flex flex-col items-start w-full gap-[8px]'>
                        <label htmlFor='lectureDesc' className=' text-[14px] text-richblack-5 font-normal'>Lecture Description {!view && (<span className=' text-pink-200'>*</span>)}</label>
                        <textarea
                          id='lectureDesc'
                          placeholder='Enter the lecture description'
                          {...register("lectureDesc", { required: true })}
                          className='w-full min-h-[130px] p-3 bg-richblack-700 text-richblack-5 rounded-lg shadow-inset-white'
                          disabled = {loading || view}
                      />
                      {
                        errors.lectureDesc &&
                        (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">Lecture Description is required**</span>
                        )
                      }
                    </div>
                    {
                        !view && (
                            <div >
                                <IconBtn
                                  text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                                  cutsomClasses={"font-semibold text-lg text-richblack-900 bg-yellow-50 rounded-lg"}
                                  >
                                  
                                    <RiEditBoxLine/>
                                </IconBtn>
                            </div>
                        )
                    }
            </form>
        </div>
    </div>
  )
}

export default SubSectionModal