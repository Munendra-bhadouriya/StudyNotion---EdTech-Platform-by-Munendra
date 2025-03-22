import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto my-12'>
       <div className='flex flex-col items-center gap-12'>
        <div className='flex flex-col items-center gap-3'>
          <p className='text-richblack-5 font-semibold text-4xl leading-[2.75rem]'>Get in Touch</p>
          <p className='text-richblack-300 font-medium text-base'>We’d love to here for you, Please fill out this form.</p>
        </div>

        <div className='mx-auto'>
          <ContactUsForm/>
        </div>
       </div> 
    </div>
  )
}

export default ContactFormSection