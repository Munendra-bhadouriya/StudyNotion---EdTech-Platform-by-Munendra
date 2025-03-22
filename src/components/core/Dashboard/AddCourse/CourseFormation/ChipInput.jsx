import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';

const ChipInput = ({ label, name, placeholder, register, errors, setValue, getValues }) => {
    
    const {course, editCourse} = useSelector((state) => state.course);
    const [tagList, setTagList] = useState([]);

    useEffect(() => {
      if (editCourse && course?.tag) {
        setTagList(course.tag);  // Ensure course.tag exists before setting
      }

      register(name, {
        required: true,
        validate: (value) => value.length > 0 || "Tag entry cannot be empty."
      });
    }, [editCourse, course?.tag, name, register]);


    useEffect(() => {
      setValue(name, tagList);
    }, [tagList, setValue, name]); // Include dependencies to avoid issues
    

    const tagHandler = (e) => {
      
      if (e.key === 'Enter' || e.key === ',') {

        e.preventDefault();

        // Get the input value and remove any leading/trailing spaces
        const chipValue = e.target.value.trim()

        // Check if the input value exists and is not already in the chips array
        if (chipValue && !tagList.includes(chipValue)) {
          // Add the chip to the array and clear the input
          const updatedList = [...tagList, chipValue]
          setTagList(updatedList)
          e.target.value = ""
        }

      }
  }
  
    const tagDeleteHandler = (tagIndex) => {
      
      const updatedList = tagList.filter((_, index) => index !== tagIndex)
      setTagList(updatedList);
    }

  return (
    <div className='flex flex-col items-start w-full gap-[8px]'>
      <label className=' text-[14px] text-richblack-5 font-normal' htmlFor={name}>{label} <span className='text-pink-200'>*</span></label>
      {
        tagList?.length > 0 && (
          <div className='flex flex-wrap w-full gap-4'>
            {
              tagList.map((item, index) => (
                <div key={index} className='flex items-center px-3 rounded-full bg-yellow-400 gap-2'>
                  <span>{item}</span>
                  <RxCross2 className='cursor-pointer' onClick={() => tagDeleteHandler(index)}/>
                </div>
              ))
            }
          </div>
        )
      }
      <input
        type='text'
        id={name}
        placeholder={placeholder}
        onKeyDown={tagHandler}
        className=' p-3 bg-richblack-700 text-richblack-5 rounded-lg w-full shadow-inset-white'
      />
      
      {
        errors[name] && (
          <span className=' text-pink-200 text-xs ml-2 tracking-wide'>{label} is required**</span>
        )
      }
    </div>
  )
}

export default ChipInput