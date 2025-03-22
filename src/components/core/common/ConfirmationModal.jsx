import React from 'react'
import IconBtn from '../common/IconBtn'
import { RiEditBoxLine } from "react-icons/ri";

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='fixed inset-0 w-full h-full flex items-center justify-center backdrop-blur-sm bg-white bg-opacity-10 z-50'>
        <div className='w-11/12 max-w-[350px] bg-richblack-800 p-6 rounded-lg border-2 border-richblack-600'>
          <div className='text-richblack-5 flex flex-col gap-5'>
              <p className='font-semibold text-2xl'>{modalData.text1}</p>
              <p className='text-richblack-200'>{modalData.text2}</p>
              
              <div className='flex gap-4'>
                  <IconBtn onclick={modalData?.btn1Handler} text={modalData?.btn1Text} cutsomClasses={"font-semibold text-lg text-richblack-900 bg-yellow-50 rounded-lg"}>
                    <RiEditBoxLine/>  
                  </IconBtn>
                  <button className='font-semibold text-lg text-richblack-900 bg-richblack-200 rounded-lg py-2 px-4' onClick={modalData?.btn2Handler}>{modalData?.btn2Text}</button>
              </div>
          </div>
        </div>
    </div>
  )
}

export default ConfirmationModal