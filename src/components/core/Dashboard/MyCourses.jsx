import React, { useEffect, useState } from 'react'
import IconBtn from '../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CourseTable from './InstructorCourses/CourseTable'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'

const MyCourses = () => {

    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
          const result = await fetchInstructorCourses(token);
          console.log("PRINTING RESULT>>>>>>>>>>", result);
            if (result) {
                setCourses(result);
            }
        }
        fetchCourses();
    }, [])

  return (
    <div className='w-full -mt-5 mb-10'>
        
      {courses && <CourseTable courses={courses} setCourses={setCourses} />}

    </div>
  )
}

export default MyCourses