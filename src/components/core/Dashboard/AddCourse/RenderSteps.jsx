import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseFormation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishForm from './Publish Course';
const RenderSteps = () => {
    const { step } = useSelector((state) => state.course);
    
    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish",
        }
    ];

  return (
    <div className='w-full relative mb-10'>
        <div className='flex justify-center items-center w-full mb-3'>
            {
                steps.map((item) => (
                    <>
                        <div>
                            <div className={`${step === item.id
                                ? "bg-yellow-900 border border-yellow-50 text-yellow-50"
                                : " bg-richblack-700 border border-richblack-400 text-richblack-300"
                                } w-[38px] aspect-square rounded-full flex justify-center items-center ${step>item.id && "bg-yellow-50"}`}>
                                {
                                    step > item.id ? (<FaCheck className=" text-richblack-800 font-bold"/>) : (item.id)
                                }

                            </div>
                        </div>

                        {
                            item.id !== steps.length && (
                                <div className={`w-[33%] border-dashed border-b-2 ${
                                    step > item.id  ? "border-yellow-50" : "border-richblack-500"
                                    } `}>
                                </div>
                            )
                        }
                    </>
                ))
            }
        </div>
        
        <div className='flex justify-between relative mb-16 w-full'>
            {
            steps.map((item) => (
                <>
                    <div className="flex min-w-[145px] justify-center">
                        <p>{item.title}</p>
                    </div>
                </>
            ))
            }
        </div>
        
        {
            step === 1 && <CourseInformationForm/>
        }
        {
            step === 2 && <CourseBuilderForm/>
        }
        {
            step === 3 && <PublishForm />
        }
    </div>
  )
}

export default RenderSteps