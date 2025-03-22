import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import OTPInput from 'react-otp-input';
const VerifyEmail = () => {

    const [otp, setOtp] = useState("");
    const { loading, signupData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formRef = useRef(null);

    const handleVerifyAndSignup = (e) => {
        e.preventDefault();

        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType
        } = signupData;


        dispatch(signup(firstName, lastName, email, password, confirmPassword, accountType, otp, navigate));
    }

  return (
    <div className='w-full flex justify-center items-center h-[calc(100vh-3.5rem)] '>   
        {/* use loading here to show spinner until page loads */}
        <div className='flex flex-col p-8 gap-6 max-w-[508px] w-full'>
            <div className='flex flex-col gap-3'>
                <div className=' font-semibold text-3xl text-richblack-5'>Verify email</div>
                <div className=' text-lg text-richblack-300'>A verification code has been sent to you. Enter the code below</div>
            </div>
            
            
            <form ref={formRef} onSubmit={handleVerifyAndSignup} className='w-full flex justify-center'>
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props}  className='bg-richblack-800 text-richblack-5 !w-12 h-12 text-center rounded-lg shadow-inset-white'/>}
                    containerStyle={{ display: "flex", gap: "5px" }}
                />
                
                
            </form>
            
            <button
            type='submit'
            onClick={() => formRef.current.requestSubmit()}
            className='rounded-lg hover:scale-95 transition-all duration-150 py-2 px-4 bg-yellow-50 shadow-inset-white-button text-richblack-900 font-medium'>
                Verify Email and Register
            </button>
        </div>
    </div>
  )
}

export default VerifyEmail