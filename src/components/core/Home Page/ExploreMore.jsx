import React, { useState } from 'react'
import HighlightText from './HighlightText'
import { HomePageExplore } from '../../../data/homepage-explore';
import CourseCard from './CourseCard';

const tabsName = [
  "Free",
  "New to Coding",
  "Most Popular",
  "Skill Paths",
  "Career Paths",
]; 

const ExploreMore = () => {

  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCards = (value) => {
    setCurrentTab(value);

    const result = HomePageExplore.find((course) => course.tag === value);
    console.log(result);
    if (result) {
      setCourses(result.courses);
      setCurrentCard(result.courses[0].heading);
    }
  };


  return (
    <div className='flex flex-col items-center justify-center pb-[250px]'>
      <div className='flex flex-col items-center gap-2 font-medium'>
        <p className=' text-4xl leading-[44px]'>Unlock the <HighlightText text={"Power of Code"} /></p>
        <p className='text-[16px] leading-6 text-richblack-300'>Learn to Build Anything You Can Imagine</p>
      </div>
      
      <div className='flex rounded-full bg-richblack-800 gap-2 my-6 p-1 '>
        {
          tabsName.map((element, index) => {
            return (
              <div className={`text-[16px] flex items-center gap-2 ${currentTab === element ? " bg-richblack-900 text-richblack-5 font-medium" : " text-richblack-300"} 
              rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
              key={index} onClick={() => setMyCards(element)}>
                {element}
              </div>
            )
          })
        }
      </div>

      {/*Course Card ka group*/}
      <div className='flex gap-10 items-center justify-between w-full absolute translate-y-[75%] pt-[32px]'>
        {
          courses.map((element, index) => {
            return (
              <CourseCard
                key={index}
                cardData={element}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
              />
            );
          })
        }
      </div>
    </div>
  )
}

export default ExploreMore