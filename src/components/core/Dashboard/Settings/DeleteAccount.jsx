import React from 'react'
import { MdDelete } from "react-icons/md";
import { deleteProfile } from '../../../../services/operations/settingsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {

    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleDeleteAccount() {

        const isConfirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

        if (isConfirmed) {
            try {
                dispatch(deleteProfile(token, navigate))
            } catch (error) {
                console.log("ERROR MESSAGE - ", error.message)
            }
        }        
    }
      

  return (
    <div className='w-full flex bg-pink-900 rounded-lg border border-pink-700 p-6 gap-5'>
        <div className='p-4 bg-pink-700 rounded-full aspect-square h-fit'>
            <MdDelete className='text-2xl text-pink-200'/>
        </div>

        <div className='flex flex-col gap-2'>
            <p className=' font-bold text-lg text-richblack-5'>Delete Account</p>
            <div className='flex flex-col gap-[2px] font-medium text-sm text-pink-25'>
                <p>Would you like to delete account?</p>
                <p>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
            </div>
            
            <button
             onClick={handleDeleteAccount}
             className='font-medium italic text-pink-300 w-fit'
              >
                I want to delete my account.
            </button>
        </div>
    </div>
  )
}

export default DeleteAccount