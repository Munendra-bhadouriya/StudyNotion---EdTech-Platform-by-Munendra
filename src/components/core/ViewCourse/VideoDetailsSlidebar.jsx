import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../common/IconBtn';
import { IoArrowBackCircle } from "react-icons/io5";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';


const VideoDetailsSlidebar = ({setReviewModal}) => {

  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const { courseId, sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures
  } = useSelector((state) => state.viewCourse);

  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [lecturesCompleted, setLecturesCompleted] = useState(completedLectures);

  useEffect(() => {
    setLecturesCompleted(completedLectures);
  }, [completedLectures]);

  useEffect(() => {
    ; (() => {
      
      if (!courseSectionData.length)
        return;
      
      const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);

      console.log("currentSectionIndex", currentSectionIndex);
      console.log("courseSectionData", courseSectionData);

      const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex(
        (data) => data._id === subSectionId
      )

      console.log("currentSubSectionIndex", currentSubSectionIndex);

      const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]?._id;

      //set current section here
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);

    })();
  }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId])

  const handleLectureCompletion = async () => {
    
    const res = await markLectureAsComplete(
      { courseId, subsectionId: subSectionId },
      token
    );
    
    if (res) {
      dispatch(updateCompletedLectures(subSectionId)); // Redux handles state update
    }

  };

  
  return (
    <div className='w-full max-w-[300px]'>
        
      <div className='w-full flex flex-col min-h-[calc(100vh-3.5rem)] bg-richblack-800 border-r border-richblack-700 py-[1.5rem] gap-4 '>
        
        {/* for buttons and Headings */}
        <div className='flex-col flex gap-4 px-4 '>
          {/* for buttons */}
          <div className='flex justify-between items-center'>
            <div
              onClick={() => {
                navigate("/dashboard/enrolled-courses")
              }}
              
              className=' cursor-pointer text-3xl text-richblack-5 '
            >
              <IoArrowBackCircle/>
            </div>

            <div >
              <IconBtn
                text="Add Review"
                onclick={() => setReviewModal(true)}
                cutsomClasses="bg-yellow-50 px-5 py-2 rounded-lg text-richblue-900 font-medium hover:scale-90 transition-all duration-150 shadow-inset-white-button"
              />
            </div>
          </div>

          {/* for headings and title */}
          <div className='flex flex-col gap-1 '>
            <p className=' font-bold text-lg capitalize text-richblack-5'>{courseEntireData?.courseName}</p>
            <p className=' font-semibold text-sm text-richblack-300'>{completedLectures?.length} of {totalNoOfLectures} lectures completed</p>
          </div>

        </div>

        {/* for sections and subsections */}
        <div className='mt-1 border-t border-richblack-500 text-sm font-medium '>
          {
            courseSectionData.map((section, index) => (
              <div
                onClick={() => {activeStatus === section._id ? setActiveStatus("") : setActiveStatus(section?._id)}}
                key={index}
                className={`mt-4 cursor-pointer bg-richblack-700`}
              >
                
                {/* section */}
                <div className='px-4 py-6 capitalize  text-richblack-5 flex justify-between items-center'>
                  <div >{section?.sectionName}</div>

                  <div className='text-lg'>{activeStatus === section._id ? <MdOutlineKeyboardArrowUp/> : <MdOutlineKeyboardArrowDown/> }</div>
                </div>

                {/* subsections */}
                <div className=' capitalize overflow-hidden transition-all duration-300 ease-in-out'>
                  {
                    activeStatus === section?._id && (
                      <div>
                        {
                          section.subSection.map((topic, index) => (
                            <div
                              className={`flex items-center gap-5 p-5 ${
                                videoBarActive === topic._id 
                                ? "bg-yellow-50 text-richblack-900" : "text-richblack-50 bg-richblack-900"
                              }`}
                              
                              key={index}

                              onClick={() => {
                                navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                              
                                setVideoBarActive(topic._id)
                                }
                              }

                              
                            >
                              <div className='text-xl' onClick={(event) => {
                                event.stopPropagation()
                                videoBarActive === topic._id && handleLectureCompletion()
                              }}>
                                {lecturesCompleted.includes(topic?._id) ? <IoCheckbox/> : <MdOutlineCheckBoxOutlineBlank/>}
                              </div>
                              <span className={`${lecturesCompleted.includes(topic?._id) && " line-through"}`}>{topic.title}</span>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </div>

              </div>
            ))
          }
        </div>
      </div>
      
    </div>
  )
}

export default VideoDetailsSlidebar