import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import RenderSteps from '../AddCourse/RenderSteps'
import { useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

const EditCourse = () => {

    const { course } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);


    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                console.log("Fetching course details for:", courseId);
                const result = await getFullDetailsOfCourse({ courseId }, token);
                console.log("API Response:", result); // Log the API response
    
                if (result?.courseDetails) {
                    console.log("Setting course in Redux:", result.courseDetails);
                    dispatch(setEditCourse(true));
                    dispatch(setCourse(result.courseDetails));
                } else {
                    console.log("No courseDetails found in API response.");
                }
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
            setLoading(false);
        })();
    }, [courseId, token, dispatch]);
    
    

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

  return (
    <div className=' w-full max-w-[1200px] flex mx-auto text-richblack-5 justify-between'>
    
        <div className='w-full max-w-[665px]'>
            {
                course ? (<RenderSteps/>) : (<div>Course Not Found</div>)
            }
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

export default EditCourse