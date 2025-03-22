import React from 'react'
import SignupForm from './SignupForm'
import frame from '../../../assets/Images/frame.png'
import LoginForm from './LoginForm'

const Template = ({title, description1, description2, image, formType, btnContent}) => {
  return (
    <div className='w-full mx-auto'>
        <div className='w-11/12 max-w-maxContent flex items-start mx-auto p-10 justify-between'>

            <div className=' w-[50%] flex flex-col items-start justify-center gap-9'>
                <div className='flex flex-col gap-4 w-[85%]'>
                    <p className=' text-3xl font-semibold text-richblack-5'>{title}</p>
                    <p className=' text-lg text-richblack-100'>{description1} <span className=' font-bold font-edu-sa text-base text-blue-100'>{description2}</span></p>
                </div>  

                {
                    formType === 'signup' ? <SignupForm btnContent={btnContent} /> : <LoginForm btnContent={btnContent}/>
                }
            </div>
            
            <div className='relative w-[45%]'>
                <img src={frame} width={585} height={531} className='z-[1] absolute top-5 left-5'/>
                <img src={image}  className=' relative z-10 '/>
            </div>
            
        </div>
    </div>
  )
}

export default Template