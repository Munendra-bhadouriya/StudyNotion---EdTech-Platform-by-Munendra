import React from 'react'
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { BiSolidPhone } from "react-icons/bi";
import ContactUsForm from '../components/core/ContactPage/ContactUsForm';
import ReviewSlider from '../components/core/common/ReviewSlider';
import Footer from '../components/core/common/Footer';

const Contact = () => {
  return (
    <div className='w-full flex flex-col items-center '>
        <div className='w-full max-w-maxContent py-24 flex gap-14 mx-auto -mt-5 justify-between'>
    
            <div className=' flex flex-col rounded-xl p-6 gap-6 bg-richblack-800 h-fit'>
                <div className='flex p-3 gap-3'>
                    <div className='text-2xl text-richblack-100'>
                        <HiChatBubbleLeftRight/>
                    </div>

                    <div className='flex flex-col gap-[2px] font-medium text-sm text-richblack-200 mt-[-4px]'>
                        <p className=' font-semibold text-lg text-richblack-5'>Chat on us</p>
                        <p>Our friendly team is here to help.</p>
                        <p>munendra.connect@gmail.com</p>
                    </div>
                    
                </div>
                
                <div className='flex p-3 gap-3'>
                    <div className='text-2xl text-richblack-100'>
                        <BsGlobeCentralSouthAsia/>
                    </div>

                    <div className='flex flex-col gap-[2px] font-medium text-sm text-richblack-200 mt-[-4px]' >
                        <p className=' font-semibold text-lg text-richblack-5'>Visit us</p>
                        <p>Come and say hello at our office HQ.</p>
                        <p>Here is the location/ address</p>
                    </div>
                    
                </div>
                
                <div className='flex p-3 gap-2'>
                    <div className='text-2xl text-richblack-100'>
                        <BiSolidPhone/>
                    </div>

                    <div className='flex flex-col gap-[2px] font-medium text-sm text-richblack-200 mt-[-3px]'>
                        <p className=' font-semibold text-lg text-richblack-5'>Chat on us</p>
                        <p>Mon - Fri From 8am to 5pm</p>
                        <p>+123 456 7890</p>
                    </div>
                    
                </div>
            </div>
            
            <div className='w-full max-w-[59%] rounded-xl p-14 gap-8 border border-richblack-600 flex flex-col'>
                <div className='flex flex-col gap-4'>
                    <p className='font-medium text-4xl text-richblack-5'>Got an Idea? We’ve got the skills. Let’s team up</p>
                    <p className=' font-medium text-richblack-300'>Tall us more about yourself and what you’re got in mind.</p>
                </div>
                <ContactUsForm/>    
            </div>
            
        </div>
        
        
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center
        text-white justify-between gap-8 bg-richblack-900 mt-16'>
            <p className=' font-semibold text-4xl text-richblack-5'>Reviews from other learners</p>
            <ReviewSlider/>
        </div>
        
        <Footer/>
    </div>
  )
}

export default Contact