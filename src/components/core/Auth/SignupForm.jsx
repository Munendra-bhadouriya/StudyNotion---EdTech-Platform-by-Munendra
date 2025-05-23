import React, { useState } from 'react'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import Tab from '../common/Tab';
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {setSignupData} from '../../../slices/authSlice'
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../../../services/operations/authAPI';

const SignupForm = ({ btnContent }) => {
    const dispatch = useDispatch();
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState(
        {
            firstName : "",
            lastName : "",
            email : "",
            password : "",
            confirmPassword : "",
        }
    )

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    /*Data to send to Tab comp */
    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        }
    ];

    const handleOnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    };

    //handle form submission
    function handleOnSubmit(e) {
        e.preventDefault();

        if(formData.password !== formData.confirmPassword){
            toast.error("Passwords do not match!")
            return;
        }

        const signupData = {
            ...formData,
            accountType
        };
        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(signupData));
        // Send OTP to user for verification
        dispatch(sendOtp(formData.email, navigate));
        //reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        });

        setAccountType(ACCOUNT_TYPE.INSTRUCTOR);
    }

  return (
    <div className='flex flex-col gap-[50px]'>
        {/*Tab */}
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />
        
        {/*Form */}
        <form className='flex flex-col items-start gap-7' onSubmit={handleOnSubmit}>
            <div className='flex items-center gap-5 w-full'>
                <label className='flex flex-col items-start gap-[6px] '>
                    <p className=' text-[14px] text-richblack-5 font-normal'>First Name<span className=' text-red'>*</span></p>
                      <input
                          required
                          name="firstName"
                          type='text'
                          value={formData.firstName}
                          onChange={handleOnChange}
                          placeholder='Enter first name'
                          className=' p-3 bg-richblack-800 text-richblack-5 rounded-lg shadow-inset-white'
                      />
                </label>
                
                <label className='flex flex-col items-start gap-[6px]'>
                    <p className=' text-[14px] text-richblack-5 font-normal'>Last Name<span className=' text-red'>*</span></p>
                      <input
                          required
                          name="lastName"
                          type='text'
                          value={formData.lastName}
                          onChange={handleOnChange}
                          placeholder='Enter last name'
                          className=' p-3 bg-richblack-800 text-richblack-5 rounded-lg shadow-inset-white'
                      />
                </label>
            </div>
            
            <label className='flex flex-col items-start gap-[6px] w-full'>
                <p className=' text-[14px] text-richblack-5 font-normal'>Email<span className=' text-red'>*</span></p>
                    <input
                        required
                        name="email"
                        type='text'
                        value={formData.email}
                        onChange={handleOnChange}
                        placeholder='Enter email address'
                        className=' p-3 bg-richblack-800 text-richblack-5 rounded-lg w-full shadow-inset-white'
                    />
            </label>
            
            <div className='flex items-center gap-5 w-full'>
                <label className='flex flex-col items-start gap-[6px] '>
                    <p className=' text-[14px] text-richblack-5 font-normal'>Create Password<span className=' text-red'>*</span></p>
                    <div className='relative'>
                        <input
                            required
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleOnChange}
                            placeholder='Enter Password'
                            className=' p-3 bg-richblack-800 text-richblack-5 rounded-lg shadow-inset-white'
                        />
                        <div className='absolute top-[37%] right-[5%] text-richblack-200 cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                            {
                                showPassword ? <PiEyeBold/> : <PiEyeClosedBold/>
                            }
                        </div>
                    </div>
                </label>
                
                <label className='flex flex-col items-start gap-[6px]'>
                    <p className=' text-[14px] text-richblack-5 font-normal'>Confirm Password<span className=' text-red'>*</span></p>
                    <div className='relative'>
                        <input
                            required
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleOnChange}
                            placeholder='Confirm Password'
                            className=' p-3 bg-richblack-800 text-richblack-5 rounded-lg shadow-inset-white'
                        />
                        <div className='absolute top-[37%] right-[5%] text-richblack-200 cursor-pointer' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                            {
                                showConfirmPassword ? <PiEyeBold/> : <PiEyeClosedBold/>
                            }
                        </div>
                    </div>
                </label>
            </div>
            
            <button className='w-full bg-yellow-25 text-richblack-900 font-medium text-base rounded-lg p-3'>
                {btnContent}
            </button>  
            
        </form>
    </div>
  )
}

export default SignupForm