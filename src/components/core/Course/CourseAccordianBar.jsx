import React, { useEffect, useRef, useState } from 'react'
import { FiChevronDown } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";
import { MdOndemandVideo } from "react-icons/md";

const CourseAccordianBar = ({ course, isActive, onClick }) => {
    
    const contentRef = useRef(null);
    const [height, setHeight] = useState();

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isActive ? contentRef.current.scrollHeight : 0);
        }
    }, [isActive]);


  return (
    <div className='w-full'>
        <div className='flex justify-between py-4 px-8 bg-richblack-700 border-b border-richblack-600' onClick={onClick}>
            <div className='flex items-center gap-2 capitalize'>
                {
                    isActive ? <FiChevronUp className='text-richblack-200 text-xl'/> : <FiChevronDown className='text-richblack-200 text-xl'/>
                }
                <div className='text-richblack-5 text-base tracking-wide font-medium'>{course.sectionName}</div>
            </div>
            
            <div className='text-yellow-50 text-sm font-medium'>{course.subSection.length} <span>{course.subSection.length > 1 ? "lectures" : "lecture"}</span></div>
        </div>
        
        <div ref={contentRef} style={{ height: `${height}px` }} className={`transition-all duration-300 ease-in-out overflow-hidden`}>
            {
                course.subSection.map((item, index) => (
                    <div className='flex items-center transition-all duration-500 py-4 px-8 gap-2 capitalize' key={index}> 
                        <MdOndemandVideo className='text-richblack-200 text-xl'/>
                        <div className='text-richblack-5 text-sm tracking-wide font-medium' >{item.title}</div>
                    </div>
                ))
            }              
        </div>
        
    </div>
  )
}

export default CourseAccordianBar