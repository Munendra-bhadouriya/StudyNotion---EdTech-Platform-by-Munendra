import React from 'react'
import { Link } from 'react-router-dom'
const Button = ({children, active, linkto, customClasses}) => {
  return (
    <Link to={linkto}>
          <div className={`text-ceter text-[16px] px-7 py-3 rounded-md font-semibold
            ${active ? "bg-yellow-50 text-black shadow-[inset_-2px_-2px_0_rgba(255,255,255,0.5)]" : " bg-richblack-800 shadow-[inset_-2px_-2px_0_rgba(255,255,255,0.3)]"}
             hover:scale-90 transition-all duration-200 ${customClasses}
            `}>
            {children}
        </div>
    </Link>
  )
}

export default Button