import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {
    
    const { course, editCourse } = useSelector((state) => state.course);
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);


    useEffect(() => {
        if (editCourse) {
            setRequirementList(course?.instructions);
        }
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        })
    }, []);

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList])

    const handleAddRequirement = () => {
        if (requirement.trim()) {

            if (requirementList.find((req) => req === requirement)) {
                setRequirement("");
                return;
            }

            setRequirementList((prev) => {
                const updatedList = [...prev, requirement];
                setValue(name, updatedList);
                return updatedList;
            });
        }
    }

    const handleRemoveRequirement = (index) => {
        setRequirementList((prev) => {
            const updatedList = prev.filter((_, i) => i !== index);
            setValue(name, updatedList);
            return updatedList;
        })
    }
    
  return (
    <div className='flex flex-col items-start w-full gap-[8px]'>
        <label className=' text-[14px] text-richblack-5 font-normal'>{label}<sup className='text-pink-200'> *</sup></label>
        <div className='flex flex-col items-start gap-3 w-full'>
            <input
                type='text'
                id={name}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                placeholder='Enter Requirements/Instructions of the course'
                className=' p-3 bg-richblack-700 text-richblack-5 rounded-lg w-full shadow-inset-white'
            />
            
            <button 
                type='button'
                onClick={handleAddRequirement} 
                className=' font-medium text-yellow-50'
            >
                Add
            </button>
        </div>
        {
            requirementList?.length > 0 && (
                <ul className='flex flex-col gap-1'>
                    {
                        requirementList.map((requirement, index) => (
                            <li key={index} className='flex items-center text-richblack-5 gap-2'>
                                <span>{requirement}</span>
                                <button type='button' onClick={() => handleRemoveRequirement(index)} className='text-xs text-pure-greys-300'>clear</button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {
            errors[name] && (
                <span className=' text-pink-200 text-xs ml-2 tracking-wide'>
                    {label} is required**
                </span>
            )
        }
    </div>
  )
}

export default RequirementField