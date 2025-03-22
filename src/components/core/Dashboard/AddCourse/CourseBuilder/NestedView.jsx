import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdOutlineFormatLineSpacing } from "react-icons/md";
import { IoPencilSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import { VscAdd } from "react-icons/vsc";
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import SubSectionModal from './SubSectionModal';

const NestedView = ({handleChangeEditSectionName}) => {

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    /*For toggling up down icon on clicking the section */
    const [isOpen, setIsOpen] = useState({});

    const handleToggeleSection = (sectionId) => {
        setIsOpen((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    }

    const handleDeleteSection = async (sectionId) => {
        
        const result = await deleteSection({ sectionId, courseId: course._id }, token);
        
        if (result) {
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({ subSectionId, sectionId}, token);

        if (result) {
            //update the structure of the course
            const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section);
            
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }

        setConfirmationModal(null);
    }



    useEffect(() => {
        console.log("NestedView Rendered");
    }, []);
    
  return (
    <div className='w-full'>
        <div className='my-3 rounded-lg bg-richblack-700 px-5 w-full'>
            {
                course?.courseContent?.map((section) => (
                    <details key={section._id} className='w-full flex flex-col' >
                        <summary className='flex items-center justify-between border-b border-richblack-500 py-3 cursor-pointer' onClick={() => handleToggeleSection(section._id)}>
                            <div className='flex items-center gap-x-3'>
                                <MdOutlineFormatLineSpacing className=' text-xl text-richblack-200' />
                                <p className=' font-semibold text-lg text-richblack-100'>{section.sectionName}</p>
                            </div>
                            <div className='flex items-center gap-x-3 text-xl text-richblack-200'>
                                <button
                                    onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                                >
                                    <IoPencilSharp />
                                </button>
                                
                                <button
                                    onClick={() => {
                                        setConfirmationModal({
                                            text1: "Delete this Section?",
                                            text2: "All the lectures in this section will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        })
                                    }}
                                >
                                    <MdDelete/>
                                </button>
                                <span>|</span>  
                                {
                                    isOpen[section._id] ? <BsCaretUpFill/>  : <BsCaretDownFill/>
                                }
                            </div>
                        </summary>

                        <div>
                            {
                                section?.subSection?.map((data) => (
                                    <div key={data?._id}
                                        onClick={() => setViewSubSection(data)}
                                        className='flex items-center justify-between border-b border-richblack-500 py-3 mx-6 cursor-pointer'
                                    >
                                        <div className='flex items-center gap-x-3'>
                                            <MdOutlineFormatLineSpacing className=' text-lg text-richblack-200'/>
                                            <p className=' font-semibold text-richblack-100'>{data.title}</p>
                                        </div>

                                        <div onClick={(e) => e.stopPropagation()} className='flex items-center gap-x-3 text-xl text-richblack-200'>
                                            <button
                                                onClick={() => setEditSubSection({...data, sectionId: section._id})}
                                            >
                                                <IoPencilSharp />
                                            </button>
                                            
                                            <button
                                                onClick={() => {
                                                    setConfirmationModal({
                                                        text1: "Delete this Sub-Section?",
                                                        text2: "Selected lecture will be deleted",
                                                        btn1Text: "Delete",
                                                        btn2Text: "Cancel",
                                                        btn1Handler: () => handleDeleteSubSection( data._id, section._id),
                                                        btn2Handler: () => setConfirmationModal(null),
                                                    })
                                                }}
                                            >
                                                <MdDelete/>
                                            </button>
                                        </div>
                                    </div>
                                        
                                ))
                            }
                        </div>

                        <button className='flex items-center my-4 gap-x-1 text-yellow-50 font-medium text-base'
                        onClick={() => setAddSubSection(section._id)}
                        >
                            <VscAdd />
                            <p>Add Lecture</p>
                        </button>
                    </details>
                ))
            }
        </div>
        
        {
            addSubSection ? 
            (<SubSectionModal
                modalData = {addSubSection}
                setModalData = {setAddSubSection}
                add = {true}
            />)
            : viewSubSection ? 
            (<SubSectionModal
                modalData = {viewSubSection}
                setModalData = {setViewSubSection}
                view = {true}
            />)
            : editSubSection ?
            (<SubSectionModal
                modalData = {editSubSection}
                setModalData = {setEditSubSection}
                edit = {true}
            />)
            : <div></div>
            
        }
        {
            confirmationModal ? <ConfirmationModal modalData={confirmationModal}/> : <div></div>
           
        }
    </div>
  )
}

export default NestedView