import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';


const SidebarLink = ({ link, iconName }) => {
    
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname)
    }

    
  return (
    <NavLink to={link.path}   /*On click pe kya karna chahiye */
      className={` relative px-6 py-2 text-base font-medium  ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-100" :"bg-opacity-0 text-richblack-300"}`}
    >

      <span className={`absolute top-0 left-0 h-full w-[0.2rem] bg-yellow-50
        ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}
      `}>
      </span> 

      <div className='flex items-center gap-x-3'>
        <Icon className="text-xl" />
        <span className=' font-medium '>{link.name}</span>
      </div>

    </NavLink>
  )
}

export default SidebarLink