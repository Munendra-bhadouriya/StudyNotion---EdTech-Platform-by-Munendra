import React, { useState } from 'react'
import {sidebarLinks} from '../../../data/dashboard-links'
import SidebarLink from '../Dashboard/SidebarLink'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../common/ConfirmationModal';
import { useSelector } from 'react-redux';

const SideBar = () => {

    const { loading: authLoading } = useSelector((state) => state.auth);
    const {user, loading: profileLoading } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [confirmationModal, setConfirmationModal] = useState(null);

    if (profileLoading || authLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }


  return (
    <>
        <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 min-h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 gap-[1rem]'>
           
           <div className='flex flex-col gap-2'>
           {
                   sidebarLinks.map((link) => {
                   if(link.type && user?.accountType !== link.type) return null;
                   return(
                       <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                   )
               })
           }
           </div>
   
           <div className='mx-auto ny-6 border w-10/12 border-richblack-600'></div>
   
           <div className='flex flex-col gap-2'>
               <SidebarLink
                   link={{name: "Settings", path:"dashboard/edit-profile"}}
                   iconName="VscSettingsGear"
               />
               
               <button onClick={() => setConfirmationModal(
                   {
                       text1: "Are You Sure ?",
                       text2: "You will be logged out of your Account",
                       btn1Text: "Logout",
                       btn2Text: "Cancel",
                       btn1Handler: () => dispatch(logout(navigate)),
                       btn2Handler: () => setConfirmationModal(null),
                   }
                 )}
                 className='px-6 py-2 text-base font-medium text-richblack-300'
                 >
                     <div className='flex items-center gap-x-3'>
                       <VscSignOut className='text-xl'/>
                       <span>Logout</span>
                     </div>
                 </button>
               
           </div>        
       </div>
       {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </>
  )
}

export default SideBar