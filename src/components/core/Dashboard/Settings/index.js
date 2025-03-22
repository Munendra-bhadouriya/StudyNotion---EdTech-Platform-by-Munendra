import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  return (
    <div className='w-full flex justify-center mb-10'>
        <div className='w-full lg:max-w-[792px] flex flex-col gap-5'>
            {/* change profile picture section */}
            <ChangeProfilePicture/>
            {/* Profile */}
            <EditProfile/>
            {/* Password */}
            <UpdatePassword/>
            {/* DeleteAccount */}
            <DeleteAccount/>
        </div>
    </div>
  )
}

export default Settings