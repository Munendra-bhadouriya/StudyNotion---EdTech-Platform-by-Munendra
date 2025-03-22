import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { changePassword } from '../../../../services/operations/settingsAPI';
import { useSelector } from 'react-redux';
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';

const UpdatePassword = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const formRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const submitPasswordForm = async (data) => {
        
        try {
            setLoading(true);
            await changePassword(data, token);
            setLoading(false);
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }               
    }

    return (

    <div className='w-full flex flex-col bg-richblack-800 rounded-lg border border-richblack-700 p-6 gap-5'>
        <p className=' font-semibold text-lg text-richblack-5'>Password</p>
        
        <form ref={formRef} onSubmit={handleSubmit(submitPasswordForm)} className='w-full flex gap-6 justify-center'>
            <div className='flex flex-col w-full gap-2 relative'>
                <label htmlFor='oldPassword' className='text-sm text-richblack-5'>Current Password <span className='text-pink-200'>*</span></label>
                <input
                    type={passwordVisible ? "text" : "password"}
                    id='oldPassword'
                    name='oldPassword'
                    placeholder='Enter Current Password'
                    {...register("oldPassword", {required: true})}
                    className='rounded-lg p-3 gap-3 bg-richblack-700 shadow-inset-white font-medium text-richblack-200'

                />
                <div className='absolute top-[59%] right-[5%] text-richblack-200 cursor-pointer text-lg' onClick={() => setPasswordVisible((prev) => !prev)}>
                    {
                        passwordVisible ? <PiEyeBold/> : <PiEyeClosedBold/>
                    }
                </div>
                {
                    errors.oldPassword &&(
                        <span className='text-xs text-pink-200'>Please enter your current password**</span>
                    )
                }
            </div>
            
            <div className='flex flex-col w-full gap-2 relative'>
                <label htmlFor='newPassword' className='text-sm text-richblack-5'>Change Password <span className='text-pink-200'>*</span></label>
                <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    id='newPassword'
                    name='newPassword'
                    placeholder='Enter New Password'
                    {...register("newPassword", {required: true})}
                    className='rounded-lg p-3 gap-3 bg-richblack-700 shadow-inset-white font-medium text-richblack-200'

                />
                <div className='absolute top-[59%] right-[5%] text-richblack-200 cursor-pointer text-lg' onClick={() => setConfirmPasswordVisible((prev) => !prev)}>
                    {
                        confirmPasswordVisible ? <PiEyeBold/> : <PiEyeClosedBold/>
                    }
                </div>
                {
                    errors.newPassword &&(
                        <span className='text-xs text-pink-200'>Please enter your new password**</span>
                    )
                }
            </div>
            
        </form>   

        
        <div>
            <button onClick={() => formRef.current.requestSubmit()} disabled={loading} className=' rounded-lg py-2 px-5 bg-yellow-50 shadow-inset-white-button text-richblack-900 font-medium'>Save</button>
        </div>    
    </div>
  )
}

export default UpdatePassword