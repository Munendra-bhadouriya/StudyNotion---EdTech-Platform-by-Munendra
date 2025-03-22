import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {

    const { total, cart } = useSelector((state) => state.cart);
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
      const courses = cart.map((course) => course._id);
      console.log("Bought these courses: ", courses);

      //TODO: API INTEGRATE -> payment gateway tak leke jaayegi
      buyCourse(token, courses, user, navigate, dispatch, cart, true);
    }


  return (
    <div className='w-1/4 py-6 mr-5'>
      <div className='w-full h-fit flex flex-col gap-4 bg-richblack-800 border border-richblack-600 rounded-lg p-6'>
        <p className=' font-semibold text-sm text-richblack-300'>Total:</p>
        <p className='font-semibold text-2xl text-yellow-50'>Rs. {total}</p>

        <IconBtn text="Buy Now" onclick={handleBuyCourse}
        cutsomClasses="bg-yellow-50 px-5 py-3 rounded-lg text-richblue-900 font-medium hover:scale-95 transition-all duration-150 shadow-inset-white-button"

        />
      </div>
    </div>
  )
}

export default RenderTotalAmount