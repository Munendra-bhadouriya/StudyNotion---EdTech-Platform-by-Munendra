import React, {useState} from 'react'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import Tab from '../common/Tab';
import { useDispatch } from 'react-redux'
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';
    
const LoginForm = ({btnContent}) => {

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const dipatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
            email : "",
            password: "",
        }
    )

    const [showPassword, setShowPassword] = useState(false);

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

    const handleOnSubmit = (e) => {
        e.preventDefault();

        dipatch(login(formData.email, formData.password, accountType,  navigate));

    }
  return (
    <div className='flex flex-col gap-[50px]'>
        {/*Tab */}
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />
        
        {/*Form */}
        <form className='flex flex-col items-start gap-8 w-[444px]' onSubmit={handleOnSubmit}>
            <label className='flex flex-col items-start gap-[6px] w-full'>
                <p className=' text-[14px] text-richblack-5 font-normal'>Email Address<span className=' text-red'>*</span></p>
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
            
            <div className='flex flex-col items-end w-full gap-[6px]'>
                <label className='flex flex-col items-start gap-[6px] w-full'>
                    <p className=' text-[14px] text-richblack-5 font-normal'>Create Password<span className=' text-red'>*</span></p>
                    <div className='relative w-full'>
                        <input
                            required
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleOnChange}
                            placeholder='Enter Password'
                            className=' p-3 bg-richblack-800 text-richblack-5 rounded-lg shadow-inset-white w-full'
                        />
                        <div className='absolute top-[37%] right-[5%] text-richblack-200 cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                            {
                                showPassword ? <PiEyeBold/> : <PiEyeClosedBold/>
                            }
                        </div>
                    </div>
                </label>
                <Link to='/forgot-password' className='text-[12px] text-blue-100 w-fit cursor-pointer'>
                    Forgot Password
                </Link>
            </div>
            
            <button className='w-full bg-yellow-25 text-richblack-900 font-medium text-base rounded-lg p-3'>
                {btnContent}
            </button> 
        </form>
    </div>
  )
}

export default LoginForm