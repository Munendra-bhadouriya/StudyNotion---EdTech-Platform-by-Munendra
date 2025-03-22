import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
    
        dispatch(getPasswordResetToken(email, setEmailSent));
        
    }

  return (
    <div className='flex items-center justify-center w-full text-white'>
        {
            loading ? (<div>Loading...</div>) :
            (
                <div className='flex flex-col items-start gap-9'>
                    <p>
                        {
                            !emailSent ?  "Reset your password" : "Check email"
                        }
                    </p>
                    <p>
                        {
                            !emailSent ? 
                            "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            :
                            `We have sent the reset email to ${email}`
                        }
                    </p>
                    
                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailSent && 
                            (
                                <label className='flex flex-col items-start gap-[6px] w-full'>
                                    <p className=' text-[14px] text-richblack-5 font-normal'>Email Address<span className=' text-red'>*</span></p>
                                        <input
                                            required
                                            name="email"
                                            type='text'
                                            value= {email}
                                            onChange= {(e) => setEmail(e.target.value)}
                                            placeholder='Enter email address'
                                            className=' p-3 bg-richblack-800 text-richblack-5 rounded-lg w-full shadow-inset-white'
                                        />
                                </label>
                            )
                        }
                        
                        <button type='submit'>
                            {
                                !emailSent ? "Reset Password" : "Resend email"
                            }
                        </button>
                    </form>
                    
                    <Link to="/login">
                        Back to login
                    </Link>
                    
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword