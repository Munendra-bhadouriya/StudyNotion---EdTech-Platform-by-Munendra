import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
import { Link } from 'react-router-dom';
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';

const UpdatePassword = () => {
    const { loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const handleOnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    };

    const [formData, setFormData] = useState(
        {
            password: "",
            confirmPassword: "",
        }
    );

    //handle form submission
    function handleOnSubmit(e) {
        e.preventDefault();

        if(formData.password !== formData.confirmPassword){
            toast.error("Passwords do not match!")
            return;
        }

        console.log("Yaha tak aaya hu");
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(formData.password, formData.confirmPassword, token ))
    }

  return (
    <div>
    {
        loading ? (
            <div>
                Loading...
            </div>    
        ) : (
            <div>
                <p>Choose  new password</p>
                <p>Almost done. Enter your new password and youre all set.</p>
                
                <form className='flex flex-col items-start gap-7' onSubmit={handleOnSubmit}>
                    <div className='flex items-center gap-5 w-full'>
                        <label className='flex flex-col items-start gap-[6px] '>
                            <p className=' text-[14px] text-richblack-5 font-normal'>New password<span className=' text-red'>*</span></p>
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
                            <p className=' text-[14px] text-richblack-5 font-normal'>Confirm new password<span className=' text-red'>*</span></p>
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
                        <button className='text-white' type='submit'>
                            Reset Password
                        </button>
                    </div>
                </form>
                
                
                
                <Link to="/login" className='text-white'>
                    Back to login
                </Link>
            </div>
        )
        
    }
        
    </div>
  )
}

export default UpdatePassword