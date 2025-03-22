import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { removeFromCart } from '../../../../slices/cartSlice';
import { GetAvgRating } from '../../../../utils/avgRating';
import CartItem from './CartItem';

const RenderCartCourses = () => {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

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