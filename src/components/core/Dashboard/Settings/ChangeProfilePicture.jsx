import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateDisplayPicture } from '../../../../services/operations/settingsAPI';

const ChangeProfilePicture = () => {

    const { user } = useSelector((state) => state.profile);
    const [previewSource, setPreviewSource] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(null);
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const fileInputRef = useRef(null);

    function handleClick() {
        fileInputRef.current.click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        console.log("Yeh file aayi hai", file)

        if (file) {
            setImageFile(file);
            previewFile(file);
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            console.log("Reader print maarke dekhte hain", reader);
            setPreviewSource(reader.result);
        }
    }

    const handleUpload = () => {
        
        try {
            console.log("uploading...")
            setLoading(true);
            const formData = new FormData();
            console.log("Printing IMage file...", imageFile);
            formData.append("displayPicture", imageFile)
            dispatch(updateDisplayPicture(token, formData)).then(() => {
                setLoading(false)
            })
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

    useEffect(() => {
        if (imageFile) {
            setPreviewSource(imageFile);
        }
    }, [imageFile])

    useEffect(() => {
        setPreviewSource(user?.image);
        const profile = 
        console.log()
    }, [])

  return (
    <div className='w-full flex bg-richblack-800 rounded-lg border border-richblack-700 p-6 gap-5 items-center'>
        <img
            src= {previewSource} className='w-[4.875rem] aspect-square rounded-full'
        />
        
        <div className='flex flex-col gap-3'>
            <p className=' font-medium text-richblack-25 leading-6'>Change Profile Picture</p>
            
            <div className='flex gap-3'>
                <input
                    type='file'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept='image/*'
                    className=' hidden'
                />
                
                <button
                    onClick={handleClick}
                    disabled={loading}
                    className=' rounded-lg py-2 px-4 bg-richblack-700 shadow-inset-white-button text-richblack-25 font-medium'
                >
                    Change
                </button>
                
                <button
                    disabled={loading}
                    onClick={handleUpload}
                    className=' rounded-lg py-2 px-4 bg-yellow-50 shadow-inset-white-button text-richblack-900 font-medium'
                >
                    {loading ? "Uploading..." : "Upload"}
                    
                </button>
            </div>
        </div>
    </div>
  )
}

export default ChangeProfilePicture