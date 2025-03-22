import React from 'react'
import { useSelector } from 'react-redux'

import CartItem from './CartItem';

const RenderCartCourses = () => {
    const { cart } = useSelector((state) => state.cart);

  return (
    <div className='w-3/4 max-w-[1000px] flex flex-col py-6 gap-8'>
        {
            cart.map((course, index) => {
                return <CartItem course={course}  key={index}/>
            })
        }
    </div>
  )
}

export default RenderCartCourses