import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../../../services/operations/settingsAPI';

const EditProfile = () => {

    const {register, formState: {errors}, handleSubmit } = useForm();

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitProfileForm = async (data) => {
        
        console.log("Form Data.....", data);
        try {
            dispatch(updateProfile(data, token));
            navigate("/dashboard/my-profile")
        }
        catch (error) {
            console.log("Error Message - ", error.message);
        }
        
    }
    
    const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

  return (
    <div className='w-full flex flex-col bg-richblack-800 rounded-lg border border-richblack-700 p-6 gap-5'>
        <p className=' font-semibold text-lg text-richblack-5'>Profile Information</p>
        
        <form onSubmit={handleSubmit(submitProfileForm)} className='w-full flex flex-col gap-5'>
            <div className='w-full flex gap-6 justify-center'>
                <div className='flex flex-col w-full gap-2 '>
                    <label htmlFor='firstName' className='text-sm text-richblack-5'>First Name <span className='text-pink-200'>*</span></label>
                    <input
                        type='text'
                        id='firstName'
                        name='firstName'
                        placeholder='Enter First Name'
                        {...register("firstName", {required: true})}
                        defaultValue={user?.firstName}
                        className='rounded-lg p-3 gap-3 bg-richblack-700 shadow-inset-white font-medium text-richblack-200'
                    />
                    {
                        errors.firstName &&(
                            <span className='text-xs text-pink-200'>Please enter your first name**</span>
                        )
                    }
                </div>
                
                <div className='flex flex-col w-full gap-2 '>
                    <label htmlFor='lastName' className='text-sm text-richblack-5'>Last Name <span className='text-pink-200'>*</span></label>
                    <input
                        type='text'
                        id='lastName'
                        name='lastName'
                        placeholder='Enter Last Name'
                        {...register("lastName", {required: true})}
                        defaultValue={user?.lastName}
                        className='rounded-lg p-3 gap-3 bg-richblack-700 shadow-inset-white font-medium text-richblack-200'

                    />
                    {
                        errors.lastName &&(
                            <span className='text-xs text-pink-200'>Please enter your last name**</span>
                        )
                    }
                </div>
                
            </div>
            
            <div className='w-full flex gap-6 justify-center'>
                <div className='flex flex-col w-full gap-2 '>
                    <label htmlFor='dateOfBirth' className='text-sm text-richblack-5'>Date of Birth <span className='text-pink-200'>*</span></label>
                    <input
                        type='date'
                        id='dateOfBirth'
                        name='dateOfBirth'
                        placeholder='Enter First Name'
                        {...register("dateOfBirth", {
                            required: {
                                value: true,
                                message: "Please enter your date of birth."
                            },
                            max: {
                                value: new Date().toISOString().split("T")[0],
                                message: "Date of birth cannot be in future."
                            }
                        })}
                        defaultValue={user?.additionalDetails?.dateOfBirth}
                        className='rounded-lg p-3 gap-3 bg-richblack-700 shadow-inset-white font-medium text-richblack-200'

                    />
                    {
                        errors.dateOfBirth &&(
                            <span className='text-xs text-pink-200'>{errors.dateOfBirth.message}**</span>
                        )
                    }
                </div>
                
                <div className='flex flex-col w-full gap-2 '>
                    <label htmlFor='gender' className='text-sm text-richblack-5'>Gender <span className='text-pink-200'>*</span></label>
                    <select
                        type='text'
                        id='gender'
                        name='gender'
                        {...register("gender", {
                            required: {
                                value: true,
                                message: "Please enter your gender."
                            }
                        })}
                        defaultValue={user?.additionalDetails?.gender}
                        className='rounded-lg p-3 gap-3 bg-richblack-700 shadow-inset-white font-medium text-richblack-200'

                    >
                        {
                            genders.map((ele, i) => (
                                <option key={i} value={ele}>
                                    {ele}
                                </option>
                            ))
                        }
                    </select>
                    {
                        errors.gender &&(
                            <span className='text-xs text-pink-200'>{errors.gender.message}**</span>
                        )
                    }
                </div>
                
            </div>
            
            <div className='w-full flex gap-6 justify-center'>
                <div className='flex flex-col w-full gap-2 '>
                    <label htmlFor='contactNumber' className='text-sm text-richblack-5'>Phone Number <span className='text-pink-200'>*</span></label>
                    <input
                        type='tel'
                        id='contactNumber'
                        name='contactNumber'
                        placeholder='Enter Phone Name'
                        {...register("contactNumber", {
                            required: {
                                value: true,
                                message: "Please enter your phone number."
                            },
                            maxLength: { value: 12, message: "Invalid Contact Number." },
                            minLength: {value: 10, message: "Invalid Contact Number"}
                        })}
                        defaultValue={user?.additionalDetails?.contactNumber}
                        className='rounded-lg p-3 gap-3 bg-richblack-700 shadow-inset-white font-medium text-richblack-200'

                    />
                    {
                        errors.contactNumber &&(
                            <span className='text-xs text-pink-200'>{errors.contactNumber.message}**</span>
                        )
                    }
                </div>
                
                <div className='flex flex-col w-full gap-2 '>
                    <label htmlFor='about' className='text-sm text-richblack-5'>About <span className='text-pink-200'>*</span></label>
                    <input
                        type='text'
                        id='about'
                        name='about'
                        placeholder='Enter Bio Details'
                        {...register("about", {
                            required: {
                                value: true,
                                message: "Please fill your about."
                            }
                        })}
                        defaultValue={user?.additionalDetails?.about}
                        className='rounded-lg p-3 gap-3 bg-richblack-700 shadow-inset-white font-medium text-richblack-200'

                    />
                    {
                        errors.about &&(
                            <span className='text-xs text-pink-200'>{errors.about.message}**</span>
                        )
                    }
                </div>
            </div>
                    
            <div className=''>
                <button type='submit' className=' rounded-lg py-2 px-5 bg-yellow-50 shadow-inset-white-button text-richblack-900 font-medium'
>
                    Save
                </button>
            </div>
        </form>
    </div>
  )
}

export default EditProfile