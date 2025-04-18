import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BigPlayButton, Player } from 'video-react';
import 'video-react/dist/video-react.css'; // import css
import { MdOutlineReplay, MdSkipNext, MdSkipPrevious } from "react-icons/md";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef();
  const { courseSectionData } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    if (!courseSectionData.length) return;
    if (!courseId || !sectionId || !subSectionId) {
      navigate("/dashboard/enrolled-courses");
      return;
    }
    
    const filteredSection = courseSectionData.find(section => section._id === sectionId);
    if (filteredSection) {
      const filteredVideo = filteredSection.subSection.find(data => data._id === subSectionId);
      setVideoData(filteredVideo || null);
      setVideoEnded(false);
    }
  }, [courseSectionData, location.pathname, courseId, navigate, sectionId, subSectionId]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(data => data._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(data => data._id === subSectionId);
    return currentSectionIndex === 0 && currentSubSectionIndex === 0;
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(data => data._id === sectionId);
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(data => data._id === subSectionId);
    return currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSections - 1;
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(data => data._id === sectionId);
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(data => data._id === subSectionId);

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id}`);
    } else {
      navigate(`/view-course/${courseId}/section/${courseSectionData[currentSectionIndex + 1]._id}/sub-section/${courseSectionData[currentSectionIndex + 1].subSection[0]._id}`);
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(data => data._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(data => data._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id}`);
    } else {
      const prevSection = courseSectionData[currentSectionIndex - 1];
      navigate(`/view-course/${courseId}/section/${prevSection._id}/sub-section/${prevSection.subSection[prevSection.subSection.length - 1]._id}`);
    }
  }

  return (
    <div className='w-full flex flex-col items-center gap-3 mx-auto max-w-[1050px] text-white min-h-[calc(100vh-3.5rem)] my-3'>
      { !videoData ? (
        <div className='flex items-center justify-center text-richblack-5 font-medium text-lg'>
          No Data found
        </div>
      ) : (
        <div className='w-full h-full relative'>
          <Player className="relative z-0" ref={playerRef} aspectRatio="16:9" playsInline onEnded={() => setVideoEnded(true)} src={videoData?.videoUrl}>
            <BigPlayButton position='center' />
          </Player>
          {videoEnded && (
            <div className='absolute h-[calc(100%-2rem)] z-[1000] inset-0 grid grid-cols-3 items-center justify-center px-8 text-4xl text-white gap-48 '>
              {!isFirstVideo() && (
                <button className=' w-full col-start-1 flex items-center justify-center' onClick={goToPrevVideo}>
                  <MdSkipPrevious />
                </button>
              )}
              <button className='w-full col-start-2 flex items-center justify-center' onClick={() => { playerRef.current?.seek(0); playerRef.current?.play(); setVideoEnded(false); }} >
                <MdOutlineReplay />
              </button>
              {!isLastVideo() && (
                <button className='w-full col-start-3  flex items-center justify-center' onClick={goToNextVideo}>
                  <MdSkipNext />
                </button>
              )}
            </div>
          )}
        </div>
      )}
      <div className='flex flex-col w-full gap-2 text-richblack-5 text-left'>
        <div className='font-semibold text-2xl capitalize'>{videoData?.title}</div>
        <div className='font-medium text-sm text-richblack-300'>{videoData?.description}</div>
      </div>
    </div>
  )
}

export default VideoDetails;
