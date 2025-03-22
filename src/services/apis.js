const BASE_URL = process.env.REACT_APP_BASE_URL

//AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signUp", 
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password"
}


//PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_ENROLLED_COURSES: BASE_URL + "/profile/getEnrolledCourses",
}

export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + '/payment/capturePayment',
    COURSE_VERIFY_API: BASE_URL + '/payment/verifyPayment',
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + '/payment/sendPaymentSuccessEmail'
}

export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + '/course/getCourseDetails',
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    EDIT_COURSE_API: BASE_URL + '/course/editCourse',
    UPDATE_SECTION_API: BASE_URL + '/course/updateSection',
    CREATE_SECTION_API: BASE_URL + '/course/addSection',
    DELETE_SECTION_API: BASE_URL + '/course/deleteSection',
    DELETE_SUBSECTION_API: BASE_URL + '/course/deleteSubSection',
    CREATE_SUBSECTION_API: BASE_URL + '/course/addSubSection',
    UPDATE_SUBSECTION_API: BASE_URL + '/course/updateSubSection',
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + '/course/getInstructorCourses',
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + '/course/getFullCourseDetails',
    DELETE_COURSE_API: BASE_URL + '/course/deleteCourse',
    CREATE_RATING_API: BASE_URL + '/course/createRating',
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
}

//CATEGORIES API
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories"
}

//CATALOG PAGE API
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails"
}

// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}

//SETTING PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + '/profile/updateProfile',
    CHANGE_PASSWORD_API:  BASE_URL + '/auth/changepassword',
    DELETE_PROFILE_API: BASE_URL + '/profile/deleteProfile',
}