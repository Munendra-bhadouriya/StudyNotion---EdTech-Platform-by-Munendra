import React from 'react'

const Stats = [
    { count: "5K", label: "Active Students" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
];

const StatsComponent = () => {
    
  return (
    <div className=' bg-richblack-800 w-full flex justify-center items-center'>
        <div className='w-11/12 max-w-maxContent flex items-center justify-between py-[5.625rem] px-10'>
            {
                Stats.map((element, index) => (
                    <div className='flex flex-col items-center justify-center gap-3' key={index}>
                        <div className='font-bold text-[1.875rem] leading-[2.375rem] text-richblack-5'>{element.count}</div>
                        <div className='font-semibold text-lg text-richblack-500'>{element.label}</div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default StatsComponent