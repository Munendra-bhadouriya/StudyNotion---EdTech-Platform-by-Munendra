import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import SideBar from '../components/core/Dashboard/SideBar';
import Footer from '../components/core/common/Footer';
import { apiConnector } from '../services/apiconnector';

const Dashboard = () => {
    const { loading: authLoading, token } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);
    const location = useLocation();
    
    const [place, setPlace] = useState("Loading...");

    useEffect(() => {
        (async () => {
            const a = location.pathname.split("/").at(-1).replaceAll("-", " ");
            if (!isNaN(parseInt(a.charAt(0), 10))) {
                try {
                    const BASE_URL = process.env.REACT_APP_BASE_URL
                    const res = await apiConnector(
                        "GET",
                        `${BASE_URL}/course/getCourseName?courseId=${a}`, // Use query parameters
                        null, // No body in GET requests
                        {
                            Authorisation: `Bearer ${token}` // Fix spelling (was "Authorisation")
                        }
                    );
                    
                    
    
                    console.log("API Response:", res); // Debugging line
    
                    if (res.data.success) {
                        setPlace(res.data.courseName);
                    } else {
                        setPlace("Course Not Found");
                    }
                } catch (error) {
                    console.log("Error fetching course name:", error);
                    setPlace("Error fetching course name");
                }
            } else {
                setPlace(a);
            }
        })();
    }, [location.pathname, token]);
    

    if (profileLoading || authLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-full flex flex-col'>
            <div className='relative w-full flex min-h-[calc(100vh - 3.5rem)] border-b border-richblack-600'>
                <SideBar/>
                <div className='w-full h-[calc(100vh - 3.5rem)] overflow-auto'>
                    <div className='w-full flex flex-col gap-11'>
                        <div className='w-full capitalize text-richblack-200 py-6 px-[2rem] flex flex-col gap-6'>
                            <p className='flex gap-2'>
                                <span>Home</span> <span>/</span>  
                                <span>Dashboard</span>  <span>/</span>  
                                <span className=' text-yellow-50'>{place}</span>
                            </p>
                            <p className='font-medium text-3xl text-richblack-5'>{place}</p>
                        </div>
                        <Outlet/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Dashboard;
