import React from 'react'
import HighlightText from './HighlightText'
import Know_your_progress from "../../../assets/Images/Know_your_progress.svg"
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg"
import plan_your_lesson from "../../../assets/Images//Plan_your_lessons.svg"
import CTAButton from './Button'

const LearningLanguageSection = () => {
  return (
      <div className='mt-16'>
          <div className='flex flex-col items-center py-[90px]'>
              <div className='flex flex-col gap-5 items-center'>
                  <p className='text-4xl font-semibold text-richblack-900'>
                    Your swiss knife for <HighlightText text={"learning any language"}/>
                  </p>
                  <p className='font-medium font-inter text-lg w-[70%] text-center text-richblack-600'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
              </div>

              <div className='flex items-center justify-center my-5 '>
                  <img src={Know_your_progress} className='object-contain -mr-32'/>
                  <img src={Compare_with_others } className='object-contain'/>
                  <img src={plan_your_lesson } className='object-contain -ml-36'/>
              </div>
            
              <CTAButton active={true} linkto={"/signup"}>
                  Learn More
              </CTAButton>
          </div>
      </div>
  )
}

export default LearningLanguageSection