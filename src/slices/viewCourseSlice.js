import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: [],
  totalNoOfLectures: 0,
}

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload
    },
    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload
    },
    updateCompletedLectures: (state, action) => {
      const subSectionId = action.payload;
      if (state.completedLectures.includes(subSectionId)) {
        // Remove the lecture if it's already marked as completed
        state.completedLectures = state.completedLectures.filter(id => id !== subSectionId);
        toast.error("Complete this lecture.")
      } else {
        // Add the lecture if it's not completed
        state.completedLectures = [...state.completedLectures, subSectionId];
        toast.success("Lecture completed.")
      }
    }
    
  },
})

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewCourseSlice.actions

export default viewCourseSlice.reducer