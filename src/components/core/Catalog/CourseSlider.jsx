import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/free-mode"
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Pagination, Autoplay, FreeMode } from 'swiper/modules';
import CourseCard from './Course_Card';

const CourseSlider = ({Course}) => {
  return (
    <div className='w-full'>
        {
            Course?.length? (
                <Swiper
                    slidesPerView={3}
                    spaceBetween={25}
                    loop={true}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: true,
                    }}
                    modules={[Autoplay, FreeMode, Pagination]}
                >
                    {
                        Course.map((course, index) => (
                            <SwiperSlide key={index }>
                                <CourseCard course={course} Height={"h-[250px]"}/>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            ) : (
                <p>No Course Found</p>
            )
        }
    </div>
  )
}

export default CourseSlider