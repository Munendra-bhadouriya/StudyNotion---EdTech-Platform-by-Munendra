import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {

    const { totalItems } = useSelector((state) => state.cart);

  return (
    <div className='w-full flex flex-col items-start mx-auto px-[2rem] text-richblack-5 mt-[-22px]'>
        <div className='w-full text-lg text-richblack-300 border-b border-richblack-600 pb-3'>
            <span>{totalItems} Courses in Cart</span>
        </div>
        
        {
            totalItems > 0 ?
            (
                <div className='flex justify-between w-full'>
                    <RenderCartCourses/>
                    <RenderTotalAmount/>
                </div>
            ) : 
            (<p>Your cart is empty</p>)
        }
    </div>
  )
}

export default Cart