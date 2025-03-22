import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/Home Page/HighlightText';
import CTAButton from '../components/core/Home Page/Button';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/Home Page/CodeBlocks';
import TimelineSection from '../components/core/Home Page/TimelineSection';
import LearningLanguageSection from '../components/core/Home Page/LearningLanguageSection';
import InstructorSection from '../components/core/Home Page/InstructorSection';
import ExploreMore from '../components/core/Home Page/ExploreMore';
import Footer from '../components/core/common/Footer';
import ReviewSlider from '../components/core/common/ReviewSlider';

const Home = () => {
  return (
    <div>
        {/*section 1*/}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center
         text-white justify-between'>

            <div className='flex flex-col items-center gap-8'>
                <Link to={"/signup"}> {/*Add shadows here*/}
                    <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-medium text-[16px] text-richblack-200
                        transition-all duration-200 hover:scale-95 w-fit shadow-inset-white'>
                        <div className='flex flex-row items-center gap-2 rounded-full px-[18px] py-[8px]
                            group-hover:ring-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>
                
                <div className='flex flex-col gap-1 items-center'>
                    <div className='text-center text-4xl leading-[44px] font-semibold mt-7 '>
                        Empower Your Future wih 
                        <HighlightText text={"Coding Skills"}/>
                    </div>
                    
                    <div className='mt-4 w-[80%] text-center text-lg font-medium text-richblack-300'>
                        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                    </div>
                </div>
                
                <div className='flex flex-row gap-7 mt-8 '>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    
                    <CTAButton active={false} linkto={"/login"}>
                        Book Demo
                    </CTAButton>
                </div>
                
                <div className='mx-3 my-7 relative shadow-[10px_-5px_50px_-5px_rgba(15,122,157,0.8)]'>  {/*Add all that white frame and blue shadow */}
                    <video muted loop autoPlay className='drop-shadow-[20px_20px_0px_rgba(245,245,245,1)] w-[1100px]'>
                        <source src={Banner} type='video/mp4'/>
                    </video>
                </div>
            </div>
            
            
            
            {/*code section 1 */}
            <div className='w-full relative'>
                <CodeBlocks 
                    position = {"lg: flex-row"}
                    heading = {
                        <div className='text-4xl font-semibold'>
                            Unlock your <HighlightText text={"coding potential "}/>
                            with our online courses.
                        </div>
                    }
                    subheading = {
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1 = {
                        {
                            btnText: "Try it yourself",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn more",
                            linkto: "/login",
                            active: false,
                        }
                    }
                      
                    codeblock = {`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                    
                    codeColor = {"text-yellow-25"}
                    backgroundGradient = {"bg-custom-gradient-orange"}
                />
            </div>
            
            {/*code section 2 */}
            <div>
                <CodeBlocks 
                    position = {"lg: flex-row-reverse"}
                    heading = {
                        <div className='text-4xl font-semibold'>
                            Unlock your <HighlightText text={"coding potential "}/>
                            with our online courses.
                        </div>
                    }
                    subheading = {
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1 = {
                        {
                            btnText: "Try it yourself",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn more",
                            linkto: "/login",
                            active: false,
                        }
                    }
                      
                    codeblock = {`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                    
                    codeColor = {"text-yellow-25"}
                    backgroundGradient = {"bg-custom-gradient-blue"}
                />
            </div>
            
              
            <ExploreMore/>
        </div>
          
        {/*section 2*/}
        <div className=' bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px] '>
                
                <div className='w-11/12 max-w-maxContent mx-auto flex flex-col justify-between items-center gap-5'>
                    <div className='h-[150px]'></div>
                    <div className='flex gap-7 text-white'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex gap-3 items-center'>
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                        
                        <CTAButton active={false} linkto={"/login"}>
                            <div className='text-'>
                                Learn More
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>
            
            <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 mx-auto mt-24'>
                <div className='w-[100%] flex justify-between items-start '>
                    <div className='w-[45%] text-4xl font-bold'>
                        Get the skills you need <HighlightText text="for a job that is in demand."/>
                    </div>
                    
                    <div className=' w-[40%] flex flex-col items-start justify-between gap-10'>
                        <div className=' text-sm text-richblack-500 font-semibold'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <CTAButton active={true} linkto={"/login"}>
                            <div>
                                Learn More
                            </div>
                        </CTAButton>
                    </div>
                </div>
                
                {/*Just to keep the code clean*/}
                <TimelineSection/>
                <LearningLanguageSection/>
            </div>
        </div>
                    
          
        {/*section 3*/}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center
         text-white justify-between gap-8 bg-richblack-900'>
            <InstructorSection/>
        </div>
        
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center
         text-white justify-between gap-8 bg-richblack-900'>
            <p className=' font-semibold text-4xl text-richblack-5'>Reviews from other learners</p>
            <ReviewSlider/>
        </div>

        {/*section 4*/}
        {/*Footer hw */}
        <Footer/>
    </div>
  )
}

export default Home