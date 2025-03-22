import React from 'react'
import HighlightText from '../components/core/Home Page/HighlightText';
import Banner1 from '../assets/Images/aboutus1.webp'
import Banner2 from '../assets/Images/aboutus2.webp'
import Banner3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/core/AboutPage/StatsComponent';
import Footer from '../components/core/common/Footer';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import ReviewSlider from '../components/core/common/ReviewSlider';

const About = () => {
  return (
    <div className='w-full flex flex-col items-center '>
        {/*Section 1 */}
        <section className=' bg-richblack-800 w-full flex justify-center'>
            <div className='relative w-11/12 max-w-maxContent flex flex-col gap-[38px] items-center mt-12'>
                <div className=' font-medium text-lg text-richblack-200 py-[6px] px-[18px]'>
                    About us
                </div>
                
                <div className='flex flex-col gap-6 items-center text-center w-[72%]'>  
                    <div className='flex flex-col item-center gap-2 text-center font-semibold text-4xl text-richblack-5'>
                        Driving Innovation in Online Education for a 
                        <HighlightText text="Brighter Future" />
                    </div>
                    
                    <div className='text-richblack-200 font-medium text-lg'>
                        Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </div>
                </div>

                <div className="sm:h-[70px] lg:h-[220px]"></div>
                
                <div className='flex justify-center absolute gap-x-6 bottom-[-20%] '>
                    <img src={Banner1} alt='' />
                    <img src={Banner2} alt='' />
                    <img src={Banner3} alt='' />
                </div>
            </div>            
        </section>
        
        {/*Section 2*/}
        <section className=' bg-richblack-900 w-full flex flex-col justify-center border-b border-richblack-600'>
            <div className="h-[100px] "></div>
            <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
                <Quote />
            </div>
        </section>
        
        {/*Section 3 */}
        <section className=' bg-richblack-900 w-full flex justify-center items-center'>
            <div className='w-11/12 max-w-maxContent flex items-center justify-between py-[5.625rem] px-10'>
                <div className='w-[50%] flex flex-col gap-7 '>
                    <div className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent font-semibold text-4xl leading-[3.7rem]'>Our Founding Story</div>
                    <div className=' font-medium text-lg text-richblack-300 flex flex-col gap-6'>
                        <div>
                            Our e-learning platform was born out of a shared vision and passion for transforming education.
                            It all began with a group of educators, technologists, and lifelong learners who recognized the
                            need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </div>
                        <div>
                            As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional
                            education systems. We believed that education should not be confined to the walls of a classroom or restricted
                            by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals
                            from all walks of life to unlock their full potential.
                        </div>
                    </div>
                </div>
                
                <div className='relative'>
                    <div className="absolute w-1/2 h-1/2 top-0 left-0 bg-gradient-to-tr from-[#EC008C] to-[#FC6767] blur-[100px] opacity-60 rounded-lg"></div>
                    <img src={FoundingStory} alt='' className='relative'/>
                </div>
            </div>
        </section>
        
        {/*Section 3 */}
        <section className='bg-richblack-900 w-full flex justify-center items-center'>
            <div className='w-11/12 max-w-maxContent flex items-start justify-between py-[5.625rem] px-10'>
                <div className='w-[45%] flex flex-col gap-7 '>
                    <div className='bg-gradient-to-br from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent font-semibold text-4xl leading-[3.7rem]'>Our Vision</div>
                    <div className=' font-medium text-lg text-richblack-300 flex flex-col gap-6'>
                        <div>
                            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                        </div>
                    </div>
                </div>
                
                <div className='w-[45%] flex flex-col gap-7 '>
                    <div className='bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent font-semibold text-4xl leading-[3.7rem]'>Our Mission</div>
                    <div className=' font-medium text-lg text-richblack-300 flex flex-col gap-6'>
                        <div>
                            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        {/*Section 4 */}
        <StatsComponent/>
        
          {/*Section 4 */}
        <section className='bg-richblack-900 w-full flex flex-col justify-center items-center gap-5 mx-auto'>
            <LearningGrid/> 
            <ContactFormSection/>
        </section> 


        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center
         text-white justify-between gap-8 bg-richblack-900 mt-16'>
            <p className=' font-semibold text-4xl text-richblack-5'>Reviews from other learners</p>
            <ReviewSlider/>
        </div>



        <Footer/>
    </div>
  )
}

export default About