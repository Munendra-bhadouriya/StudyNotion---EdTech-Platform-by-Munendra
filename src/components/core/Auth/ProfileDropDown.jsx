import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { VscDashboard } from "react-icons/vsc";
import { VscSignOut } from "react-icons/vsc";
import { logout } from '../../../services/operations/authAPI';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <button className='relative' onClick={() => setIsOpen(true)}>
      <div className='flex text-richblack-200 items-center cursor-pointer'>
        <img width={30} height={30} className='aspect rounded-full' src={`${user?.image}`} />
        <IoMdArrowDropdown className=' text-2xl'/>
      </div>
      {
        isOpen && (
          <div
            ref={ref}
            className='absolute top-[145%] z-[1000] right-0 divide-y-[1px] divide-richblack-500 bg-richblack-700 rounded-lg border border-richblack-500 text-richblack-100'
          >
            <Link to={"/dashboard/my-profile"}>
              <div className='flex items-center gap-1 p-2 hover:bg-richblack-600'>
                <VscDashboard />
                <span className='text-sm'>Dashboard</span>
              </div>
            </Link>

            <div
              className='flex items-center gap-1 p-2 hover:bg-richblack-600'
              onClick={() => {
                dispatch(logout(navigate))
                setIsOpen(false)
              }}
            >
              <VscSignOut />
              <span className='text-sm'>Logout</span>
            </div>
          </div>
        )
      }
    </button>
  )
}

export default ProfileDropDown