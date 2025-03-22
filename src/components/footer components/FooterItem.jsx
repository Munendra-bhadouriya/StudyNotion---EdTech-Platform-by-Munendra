import React from 'react'
import { Link } from 'react-router-dom'
const FooterItem = ({text, linkto}) => {
  return (
    <Link to={linkto}>
      <div className='text-base leading-6 text-richblack-400 hover:text-richblack-100 transition-all duration-200 cursor-pointer'>
        {text}
      </div>
    </Link>
  )
}

export default FooterItem