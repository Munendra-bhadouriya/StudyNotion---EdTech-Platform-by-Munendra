import React from 'react'
import { HiUsers } from "react-icons/hi2";
import { ImTree } from "react-icons/im";
const CourseCard = ({cardData, setCurrentCard, currentCard}) => {
  return (
    <div className= {`flex flex-col w-[30%] ${currentCard === cardData.heading ? "bg-white shadow-[12px_12px_0px_0px_rgba(255,214,10,1.0)]" : "bg-richblack-800"}
     transition-all duration-200 cursor-pointer `}
    
     onClick={() => setCurrentCard(cardData.heading)}>
     
        <div className=' pt-8 px-6 pb-[52px] flex flex-col gap-3'>
            <div className= {`font-semibold text-[20px] leading-7 ${currentCard === cardData.heading ? "text-richblack-900" : " text-richblack-25"}`}>
                {cardData.heading}
            </div>
            <div className={` font-normal text-lg ${currentCard === cardData.heading ? " text-richblack-500" : "text-richblack-400"}`}>
                {cardData.description}
            </div>
        </div>
        
        <div className={`flex border-t border-dashed border-transparent 
            [border-image:repeating-linear-gradient(90deg,_var(--border-color)_0_8px,_transparent_5px_14px)_1] 
            gap-4 items-center justify-between`}
            style={{
                "--border-color": currentCard === cardData.heading ? "#C5C7D4" : "#424854",
            }}
        >
        
            <div className={`flex gap-2 py-4 px-5 items-center justify-between  ${currentCard === cardData.heading ? " text-blue-500" : "text-richblack-300"}`}>
                <HiUsers className="w-[20px] h-[20px]" />
                <div className="font-medium text-[16px] leading-6">{cardData.level}</div>
            </div>
            
            <div className={`flex gap-2 py-4 px-5 items-center ${currentCard === cardData.heading ? " text-blue-500" : "text-richblack-300"}`}>
                <ImTree className="w-[20px] h-[20px]" />
                <div className="font-medium text-[16px] leading-6">{cardData.lessionNumber} Lessons</div>
            </div>
        </div>

    </div>
  )
}

export default CourseCard