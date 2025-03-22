import toast from "react-hot-toast";
import {apiConnector} from '../apiconnector'
import { courseEndpoints } from "../apis";

const {
    COURSE_CATEGORIES_API,
    COURSE_DETAILS_API,
    EDIT_COURSE_API,
    CREATE_COURSE_API,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    DELETE_COURSE_API,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
} = courseEndpoints


export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...");

    let result = null;
    try {
        const response = await apiConnector("POST", COURSE_DETAILS_API, { courseId });

        console.log("COURSE_DETAILS_API RESPONSE...", response);

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response.data;
    }
    catch (error) {
        console.log("COURSE_DETAILS_API ERROR", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const fetchCourseCategories = async () => {
    let result = [];
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API);
        console.log("COURSE CATEGORY API RESPONSE...", response);

        if (!response?.data?.success) {
            throw new Error("Could Not fetch course categories.");
        }

        result = response?.data?.data;
    }
    catch (error) {
        console.log("COURSE CATEGORY API ERROR...", error);
        toast.error(error.message);
    }
    return result;
}

export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        })
        console.log("CREATE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    }
    catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const editCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        })

        console.log("EDIT COURSE API RESPONSE............", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Update Course Details")
        }

        toast.success("Course Details Updated Successfully");
        result = response?.data?.data

    }
    catch (error) {
        console.log("EDIT COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}

//create section
export const createSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorisation: `Bearer ${token}`,
        })

        console.log("CREATE SECTION API RESPONSE...", response);

        if (!response?.data?.success) {
            throw new Error("Could not create section");
        }

        toast.success("Course Section created");
        result = response?.data?.updatedCourseDetails;
        console.log("RESULTTTTT", result);
    }
    catch (error) {
        console.log("CREATE SECTION API ERROR", error)
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//update section
export const updateSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    
    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorisation: `Bearer ${token}`,
        });

        console.log("UPDATE SECTION API RESPINSE....", response);
        if (!response?.data?.success) {
            throw new Error("Could not update section");
        }

        toast.success("Course Section Updated");
        result = response?.data?.data;

    }
    catch (error) {
        console.log("UPDATE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}


//delete section
export const deleteSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorisation: `Bearer ${token}`
        })

        console.log("DELETE SECTION API RESPINSE....", response);

        if (!response?.data?.success) {
            throw new Error("Could not delete section");
        }

        toast.success("Course Section Deleted");
        result = response?.data?.data;

    }
    catch (error) {
        console.log("DELETE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

//create subsection
export const createSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorisation: `Bearer ${token}`
        })

        console.log("CREATE SUBSECTION API RESPONSE...", response);

        if (!response?.data?.success) {
            throw new Error("Could not create sub section");
        }

        console.log("RESPONSE??? ", response);
        toast.success("SubSection created");
        result = response?.data?.updatedSection;
        
        
    }
    catch (error) {
        console.log("CREATE Sub SECTION API ERROR", error)
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//update subsection
export const updateSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    
    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorisation: `Bearer ${token}`,
        });

        console.log("UPDATE SUB SECTION API RESPINSE....", response);
        if (!response?.data?.success) {
            throw new Error("Could not update Sub section");
        }

        toast.success("Course Sub Section Updated");
        result = response?.data?.data;

    }
    catch (error) {
        console.log("UPDATE Sub SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}


//delete section
export const deleteSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
            Authorisation: `Bearer ${token}`
        })

        console.log("DELETE SUB SECTION API RESPINSE....", response);

        if (!response?.data?.success) {
            throw new Error("Could not delete sub section");
        }

        toast.success("Sub Section Deleted");
        result = response?.data?.data;

    }
    catch (error) {
        console.log("DELETE Sub SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

// fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
    let result = [];
    const toastId = toast.loading('Loading...');

    try {
        const response = await apiConnector('GET', GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorisation: `Bearer ${token}`
        });

        console.log("FETCH INSTRUCTOR COURSES API.......", response);

        if (!response.data.success) {
            throw new Error('Could not fetch instructor courses');
        }

        result = response?.data?.data;
    }
    catch (error) {
        console.log("FETCH INSTRUCTOR COURSES API ERROR............", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId);
    return result;
}

//get full details of course
export const getFullDetailsOfCourse = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    
    try {
        const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED, data, {
            Authorisation: `Bearer ${token}`
        });

        console.log("GET FULL DETAILS OF COURSE API.......", response);

        if (!response.data.success) {
            throw new Error('Could not fetch FULL DETAILS OF COURSE');
        }

        result = response?.data?.data;
    }
    catch (error) {
        console.log("GET FULL DETAILS OF COURSE API ERROR............", error)
        toast.error(error.message)
    }
    
    toast.dismiss(toastId);
    return result;
}

export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorisation: `Bearer ${token}`
        })

        if (!response?.data?.success) {
            throw new Error("Could Not Delete Course")
        }
        
        toast.success("Course Deleted")
    }
    catch (error) {
        console.log("DELETE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
}

// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
        Authorisation: `Bearer ${token}`,
      })
      console.log(
        "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
        response
      )
  
      if (!response.data.success) {
        throw new Error(response.data.error)
      }
      
      result = true
    } catch (error) {
      console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
      toast.error(error.message)
      result = false
    }
    toast.dismiss(toastId)
    return result
}

//create a rating for course
export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
        const response = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorisation: `Bearer ${token}`,
        })

        console.log("CREATE RATING API.......", response);

        if (!response.data.success) {
            throw new Error('Could not CREATE RATING');
        }
        toast.success("Rating Created")
        success = true;
    }
    catch (error) {
        console.log("CREATE RATING API ERROR............", error)
        if (error.status === 403) {
            toast.error("Cant review a course twice...")
        }
        else{
            toast.error(error.message)
        }        
    }
    toast.dismiss(toastId);
    return success;
}