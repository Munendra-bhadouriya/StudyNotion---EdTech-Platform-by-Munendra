import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {apiConnector} from "../../../services/apiconnector"
import { contactusEndpoint } from '../../../services/apis';
import toast from 'react-hot-toast';
import CountryCode from "../../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async (data) => { 
        
        console.log(data);
        setLoading(true);
        const toastId = toast.loading("Loading...")
        try {
            
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            console.log("Contact Form submission RESPONSE...", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Contact Us form used Successfully");
        }
        catch (error) {
            console.log("Contact Form submission Error");
            toast.error("Failed to submit contact form");
        }
        toast.dismiss(toastId);
        setLoading(false);
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNumber: "",
                countryCode: "",
            });
        }
    }, [isSubmitSuccessful, reset]);


  return (
    <div className='flex items-center justify-center'>
        {
            (
                
                <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col items-center gap-5 lg:w-[90%]'>

                    {/* first name and last name field */}
                    <div className='flex items-center justify-between w-full'>
                        <label className='w-[50%] flex flex-col items-start gap-[6px] '>
                            <p className=' text-[14px] text-richblack-5 font-normal'>First Name</p>
                            <input
                                required
                                name="firstName"
                                type='text'
                                placeholder='Enter first name'
                                className=' px-5 py-3 bg-richblack-800 text-richblack-5 rounded-lg shadow-inset-white'
                                {...register("firstName")}
                            />
                        </label>
                        
                        <label className=' w-[calc(100% - 50%)] flex flex-col items-start gap-[6px]'>
                            <p className=' text-[14px] text-richblack-5 font-normal'>Last Name</p>
                            <input
                                required
                                name="lastName"
                                type='text'
                                placeholder='Enter last name'
                                className=' px-5 py-3 bg-richblack-800 text-richblack-5 rounded-lg shadow-inset-white'
                                {...register("lastName")}
                            />
                        </label>
                    </div>
                    
                    {/* email field */}
                    <label className='flex flex-col items-start gap-[6px] w-full'>
                        <p className=' text-[14px] text-richblack-5 font-normal'>Email</p>
                            <input
                                required
                                name="email"
                                type='email'
                                placeholder='Enter email address'
                                className='px-5 py-3 bg-richblack-800 text-richblack-5 rounded-lg w-full shadow-inset-white'
                                {...register("email")}
                            />
                        
                    </label>
                    
                    {/* phone number */}
                    <div className='flex flex-col gap-[0.375rem]'>
                        <label htmlFor='phoneNumber' className=' text-[14px] text-richblack-5 font-normal'>Phone Number</label>
                        
                        <div className='flex gap-[0.75rem]'>
                            <select
                                required
                                name='countryCode'
                                id='countryCode'
                                {...register("countryCode")}
                                className='w-[12%] p-1 bg-richblack-800 text-richblack-5 rounded-lg shadow-inset-white scrollbar-thin scrollbar-thumb-richblack-700 scrollbar-track-sky-300'
                            >
                                {
                                    CountryCode.map((element, index) => (
                                        <option key={index}>
                                            {element.code} - {element.country}
                                        </option>
                                    ))
                                }
                            </select>
                            
                            <input
                                required
                                name="phoneNumber"
                                type='phoneNumber'
                                placeholder='12345 67890'
                                className=' p-3 bg-richblack-800 text-richblack-5 rounded-lg w-full shadow-inset-white'
                                {...register("phoneNumber",{
                                                minLength: {value: 10, message:"Please enter a valid number."},
                                                maxLength: {value:12, message: "Please enter a valid number."},
                                            })}
                            />
                            {
                                errors.phoneNumber && (
                                    <span>{errors.phoneNumber.message}</span>
                                )
                            }
                            
                        </div>
                    </div>
                    
                    {/* message */}
                    <label className='flex flex-col items-start gap-[6px] w-full'>
                        <p className=' text-[14px] text-richblack-5 font-normal'>Message<span className=' text-red'>*</span></p>
                            <textarea
                                required
                                name="message"
                                placeholder='Enter your message.'
                                className=' p-3 bg-richblack-800 text-richblack-5 rounded-lg w-full shadow-inset-white'
                                {...register("message")}
                                rows={8}
                            />
                        
                    </label>
                    
                    <button type='submit' disabled={loading} className={`mt-4 w-full text-ceter text-[16px] px-7 py-3 rounded-md font-semibold bg-yellow-50 text-black shadow-[inset_-2px_-2px_0_rgba(255,255,255,0.5)] hover:scale-90 transition-all duration-200 `}>Send Message</button>
                </form>
            )
        }
    </div>
  )
}

export default ContactUsForm