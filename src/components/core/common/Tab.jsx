import React from 'react'

const Tab = ({tabData, field, setField}) => {
  return (
    <div className='flex items-center gap-[10px] rounded-full p-1 bg-richblack-800 w-fit shadow-inset-white'>
        {
            tabData.map((element) => (
                <button className={` py-[6px] px-[18px] font-medium text-base  text-center rounded-full transition-all duration-200
                    ${field === element.type ? "bg-richblack-900 text-richblack-5" : "bg-richblack-800 text-richblack-200" }
                `}
                key={element.id}
                onClick={() => setField(element.type)}
                >
                    {element.tabName}
                </button>
            ))
        }
    </div>
  )
}

export default Tab