import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from './Button'
import { FaArrowRight } from "react-icons/fa";


const InstructorSection = () => {
  return (
    <div className='py-[90px]'>
        <div className='flex items-center justify-start gap-20'>
            <div className='w-[50%]'>
                  <img src={Instructor} alt='instructor'/>
            </div>
            
            <div className='w-[45%]'>
                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-4xl font-semibold'>Become an </p>
                        <p className='text-4xl font-semibold'> <HighlightText text={"instructor"}/></p>
                    </div>
                    
                    <p className='font-medium text-[16px] leading-6 text-richblack-300 w-[90%]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                    
                    <div className='w-fit pt-14'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-2'>
                                <p>Start Teaching Today</p>
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection