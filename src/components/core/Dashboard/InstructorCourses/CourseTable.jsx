import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Th, Thead, Tr, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { COURSE_STATUS } from '../../../.././utils/constants'
import { HiMiniCheckCircle } from "react-icons/hi2";
import { HiMiniClock } from "react-icons/hi2";
import { HiMiniPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import ConfirmationModal from '../../common/ConfirmationModal';
import { formatDate } from '../../../../services/formatDate';
const CourseTable = ({ courses, setCourses }) => {
    
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();

  const handleCourseDelete = async(courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);

    const result = await fetchInstructorCourses(token);

    if (result) {
      setCourses(result);
    } 

    setConfirmationModal(null);
    setLoading(false);
  }

  return (
    <div className='w-full max-w-maxContent mx-auto px-10'>
        <Table className='w-full rounded-lg border border-richblack-600'>
          <Thead className='w-full border border-richblack-600'>
            <Tr className='flex p-4 px-8 font-medium text-sm leading-6 uppercase text-richblack-100 '>
              <Th className='w-[65%] text-left'>Courses</Th>
              <div className='w-[35%] flex justify-between text-left'>
                <Th className='w-full'>Duration</Th>
                <Th className='w-full'>Price</Th>
                <Th className='w-full'>Actions </Th>
              </div>
            </Tr>
          </Thead>
          
          <Tbody className='w-full flex flex-col gap-5'>
            {courses?.length === 0 ? (
              <Tr>
                <Td>No Courses Found</Td>
              </Tr>
              ) : (
                courses.map((course) => {
                  return <Tr key={course._id} className='flex p-4'>
                    <Td className='w-[65%] text-left flex p-4 gap-6'>
                      <img
                        src={course?.thumbnail}
                        className='h-[150px] w-[220px] rounded-lg object-cover'
                      />

                      <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-2'>
                          <p className=' font-semibold text-xl text-richblack-5'>{course.courseName}</p>
                          <p className=' text-sm text-richblack-100'>{course.courseDescription}</p>
                        </div>
                        <p className=' font-medium text-xs leading-5 text-richblack-25'>Created: {formatDate(course.createdAt)} </p>
                        <div>
                          {course.status === COURSE_STATUS.PUBLISHED ?
                          
                            (<div className='w-fit flex items-center rounded-[200px] py-[2px] px-2 gap-2 bg-richblack-600 text-yellow-50 font-medium text-xs leading-5'>
                              <HiMiniCheckCircle />
                              <p>{COURSE_STATUS.PUBLISHED}</p>
                            </div>
                              
                            ) :
                            
                            (<div className='w-fit flex items-center rounded-[200px] py-[2px] px-2 gap-2 bg-richblack-600 text-pink-100 font-medium text-xs leading-5'>
                              <HiMiniClock />
                              <p>{COURSE_STATUS.DRAFT}</p>
                            </div>)
                          }
                        </div>
                      </div>
                    </Td>

                    <div className='w-[35%] flex justify-between font-medium leading-6 text-richblack-100'>
                      <Td className='w-full flex items-center'>
                        {course.totalDuration}
                      </Td>

                      <Td className='w-full flex items-center'>
                        ₹{course.price}
                      </Td>

                      <Td className='w-full flex gap-3 items-center text-xl'>
                        <button onClick={() => navigate(`/dashboard/edit-course/${course._id}`)} className='hover:text-yellow-50 duration-150 transition-all'>
                            <HiMiniPencil/>
                        </button>

                        <button
                          onClick={() => setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2:
                            "All the data related to this course will be deleted",
                          btn1Text: !loading ? "Delete" : "Loading...  ",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                          })} 
                          className='hover:text-pink-200 duration-150 transition-all'
                        >
                          <MdDelete/>
                        </button>
                      </Td>
                    </div>
                  </Tr>
                })
              )}
          </Tbody>
      </Table>
      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
      }
    </div>
  )
}

export default CourseTable