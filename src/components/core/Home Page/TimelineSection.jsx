import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to success of company."
    },
    {
        Logo: Logo2,
        Heading: "Leadership",
        Description: "Fully committed to success of company."
    },
    {
        Logo: Logo3,
        Heading: "Leadership",
        Description: "Fully committed to success of company."
    },
    {
        Logo: Logo4,
        Heading: "Leadership",
        Description: "Fully committed to success of company."
    },
];

const TimelineSection = () => {
  return (
    <div>
        <div className='flex items-center gap-15'>
            <div className='flex flex-col gap-5 w-[45%]'>
                {
                    timeline.map((element, index) => {
                        return (
                            <div className='flex gap-6' key={index}>
                                <div className='w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center'>
                                    <img src={element.Logo} className='w-[24px] h-[24px] ' />
                                </div>
                                <div className='flex flex-col '>
                                    <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                                    <p className='text-base'>
                                        {element.Description}
                                    </p>
                                </div>
                            </div>
                        )    
                    })
                }
            </div>
            
            <div className='relative '>
                <img src={timelineImage}  alt='timeLineImage' className='shadow-white object-cover h-fit'/>
                
                <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-6 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-12'>
                          <p className='text-3xl font-bold'>10</p>
                          <p className=' text-caribbeangreen-300 text-sm'>Years of Experience</p>
                    </div>
                    
                    <div className='flex gap-5 items-center px-12'>
                          <p className='text-3xl font-bold'>250</p>
                          <p className=' text-caribbeangreen-300 text-sm'>TYPES OF COURSES</p>
                    </div>
                    
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default TimelineSection