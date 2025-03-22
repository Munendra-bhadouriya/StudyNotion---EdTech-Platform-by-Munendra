import React from 'react'
import RenderSteps from './RenderSteps'
const AddCourse = () => {
  return (
    <div className=' w-full max-w-[1200px] flex mx-auto text-richblack-5 justify-between'>
        <div className='w-full max-w-[665px]'>             
            <div className='w-full'>
                <RenderSteps/>
            </div>
        </div>
        
        <div className='w-full max-w-[384px] p-6 flex flex-col gap-5 border border-richblack-600 bg-richblack-800 h-fit rounded-lg'>
            <p className=' font-semibold text-lg'>⚡Course Upload Tips</p>
            <ul  className="list-disc pl-5 flex flex-col gap-3 text-sm">
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important</li>
                <li>Notes to all enrolled students at once.</li>
            </ul>
        </div>
    </div>
  )
}

export default AddCourse