import React from 'react'
import HighlightText from '../../core/Home Page/HighlightText'
import { Link } from 'react-router-dom';
import CTAButton from '../Home Page/Button'
const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];

const LearningGrid = () => {
  return (
    <div className='w-11/12 max-w-maxContent grid mx-auto grid-cols-1 lg:grid-cols-4 py-[5.625rem]'>
    {
        LearningGridArray.map((card, index) => (
            <div key={index} className={`${index === 0 && "lg:col-span-2"}
            ${card.order % 2 === 1 ? "bg-richblack-700" : "bg-richblack-800"}
            ${card.order === 3 && "lg:col-start-2"}
              lg:h-[294px]` }>
                {
                  card.order < 0 ? 
                  (
                    <div className='h-full bg-richblack-900'>
                      <div className=' flex flex-col gap-8 items-start justify-between lg:w-[85%]'>
                      
                        <div className='flex flex-col items-start gap-3'>
                          <div className=' text-richblack-5 font-semibold text-4xl leading-[2.75rem]'>
                            {card.heading} <HighlightText text={card.highlightText} />
                          </div>
                          <div className='text-richblack-300'>
                            {card.description}
                          </div>
                        </div>
                        
                        <CTAButton linkto={card.BtnLink} active={true}>{card.BtnText}</CTAButton>
                        
                      </div>
                    </div>
                  )
                  :
                  (<div className='w-full h-full flex items-center justify-center'>
                    <div className='p-8 flex flex-col text-richblack-5 gap-8'>
                      <div className='font-semibold text-[1.125rem] leading-[1.625rem]'>
                        {card.heading}
                      </div>
                      <div className=' text-richblack-300 font-normal text-base '>{card.description}</div>
                    </div>
                  </div>)
                }
            </div>
        ))
    }
    </div>
  )
}

export default LearningGrid