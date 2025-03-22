import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Footer from '../components/core/common/Footer';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';


const Catalog = () => {
    const location = useLocation();
    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    //fetch all categories
    useEffect(() => {
        const getCategories = async () => {
            const response = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = response?.data?.data.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
            }
            catch (error) {
                console.log(error);
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
    }, [categoryId])
  return (
    <div className='w-full flex flex-col gap-12'>
        
        {/* section 1 */}
        <div className='w-full bg-richblack-800'>
            <div className='w-11/12 max-w-maxContent capitalize text-richblack-200 py-8 flex flex-col gap-6 mx-auto'>
                <p className='flex gap-2'><span>Home</span> <span>/</span>  <span>Catelog</span>  <span>/</span> <span className=' text-yellow-50'>{`${location.pathname.split("/").at(-1).replaceAll("-", " ")}`}</span></p>
                <p className='font-medium text-3xl text-richblack-5'>{`${location.pathname.split("/").at(-1).replaceAll("-", " ")}`}</p>
                <p>{catalogPageData?.data?.selectedCategory?.description}</p>
            </div>
        </div>
        
        {/* section 2 */}
        <div className=' text-richblack-5 w-11/12 max-w-maxContent mx-auto gap-16 flex flex-col'>
            {/* Part 1 */}
            <div className='flex flex-col w-full gap-11'>
                <div className='w-full flex flex-col gap-2'>
                    <p className=' font-semibold text-3xl'>Courses to get you started</p>
                    <div className='w-full border-b border-richblack-600 flex gap-x-3'>
                        <div className='py-2 px-3 text-yellow-50 border-b border-yellow-50 '>Most Popular</div>
                        <div className=' py-2 px-3'>New</div>
                    </div>
                </div>
                
                <div className='w-full'>
                    <CourseSlider Course={catalogPageData?.data?.selectedCategory?.courses} />
                </div>
            </div>
            
            {/* Part 2 */}
            <div className='w-full flex flex-col gap-11'>
                <div className=' font-semibold text-3xl'>Top Courses {catalogPageData?.data?.differentCategories?.name}</div>
                <div className='w-full'>
                    <CourseSlider Course={catalogPageData?.data?.differentCategories?.courses} />
                </div>
            </div>
            
            {/* Part 3 */}
            {/* <div>
                <div>Frequently Bought Together</div>
                <div className='py-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-2'>
                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                            .map((course, index) => {
                                <Course_Card course={course} key={index} Height="h-[400px]"/>
                            })
                        }
                    </div>
                </div>
            </div> */}
        </div>
        <Footer/>
    </div>
  )
}

export default Catalog