import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../common/IconBtn'
import { RiEditBoxLine } from "react-icons/ri";

const MyProfile = () => {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

  return (
    <div className='w-full max-w-[792px] ml-[12rem] flex flex-col gap-11 mb-20'>
        {/* section 1 */}
        <div className='w-full bg-richblack-800 p-6 flex items-center justify-between rounded-lg border border-richblack-500'>
            <div className='flex items-center gap-6'>
                <img src={`${user?.image}`} alt={`profile-${user?.firstName}`} className='aspect-square w-[78px] rounded-full object-cover'/>
                <div className='flex flex-col gap-1'>
                    <p className='text-semibold text-lg text-richblue-5'>{user?.firstName + " " + user?.lastName}</p>
                    <p className=' text-richblack-200'>{user?.email}</p>     
                </div>
            </div>
            <IconBtn text="Edit" onclick={() => navigate("/dashboard/edit-profile")} cutsomClasses={"font-semibold text-lg text-richblack-900 bg-yellow-50 rounded-lg"}>
                <RiEditBoxLine/>
            </IconBtn>
        </div>
        
        {/* About section */}
        <div className='w-full bg-richblack-800 p-6 flex items-start justify-between rounded-lg border border-richblack-500'>
            <div className='flex flex-col items-start gap-4'>
                <p className='font-semibold text-lg text-richblue-5'>About</p>
                <p className=' text-richblack-200'>{user?.additionalDetails?.about ?? "Write something about yourself."}</p>
            </div>
            <IconBtn text="Edit" onclick={() => navigate("/dashboard/edit-profile")} cutsomClasses={"font-semibold text-lg text-richblack-900 bg-yellow-50 rounded-lg"}>
                <RiEditBoxLine/>
            </IconBtn>
        </div>
        
          
        {/* Profile Details section */}
        <div className='w-full grid lg:grid-cols-3 bg-richblack-800 p-6 rounded-lg border border-richblack-500 gap-5'>
            <div className=' text-richblack-5 text-lg font-semibold'>Personal Details</div>
            
            <div className='flex justify-end col-start-3 w-full'>
                <IconBtn text="Edit" onclick={() => navigate("/dashboard/edit-profile")} cutsomClasses={"w-fit font-semibold text-lg text-richblack-900 bg-yellow-50 rounded-lg"}>
                    <RiEditBoxLine/>
                </IconBtn>
            </div>
            
            <div className='flex flex-col gap-1'>
                <p className=' text-sm text-richblack-500'>First Name</p>
                <p className='text-richblack-5'>{user.firstName}</p>
            </div>
            
            <div className='w-full flex justify-start ml-16'>
                <div className='w-fit flex flex-col gap-1'>
                    <p className=' text-sm text-richblack-500'>Last Name</p>
                    <p className='text-richblack-5'>{user.lastName}</p>
                </div>
            </div>
            
            <div className='flex flex-col gap-1 col-start-1'>
                <p className=' text-sm text-richblack-500'>Email</p>
                <p className='text-richblack-5'>{user.email}</p>
            </div>

            <div className='w-full flex justify-start  ml-16'>
                <div className='w-fit flex flex-col gap-1'>
                    <p className=' text-sm text-richblack-500'>Phone Number</p>
                    <p className='text-richblack-5'>{user?.additionalDetails?.contactNumber ?? "Add Phone Number"}</p>
                </div>
            </div>
            
            <div className='flex flex-col gap-1 col-start-1'>
                <p className=' text-sm text-richblack-500'>Gender</p>
                <p className='text-richblack-5'>{user.additionalDetails.gender ?? "Add Gender"}</p>
            </div>

            <div className='w-full flex justify-start  ml-16' >
                <div className='flex flex-col gap-1'>
                    <p className=' text-sm text-richblack-500'>Date of Birth</p>
                    <p className='text-richblack-5'>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default MyProfile