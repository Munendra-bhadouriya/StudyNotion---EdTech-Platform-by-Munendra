import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CourseTable from './InstructorCourses/CourseTable'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'

const MyCourses = () => {

    const { token } = useSelector((state) => state.auth);
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
    }, [token])

  return (
    <div className='w-full -mt-5 mb-10'>
        
      {courses && <CourseTable courses={courses} setCourses={setCourses} />}

    </div>
  )
}

export default MyCourses