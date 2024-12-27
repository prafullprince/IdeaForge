import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// initialstate
const initialState: any = {
    courseData: null,
    courseContent: null,
    currentSection: null,
    currentSubSection: null
};

// slice
const courseViewSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseData(state:any,action:PayloadAction<any>){
        state.courseData = action.payload;
    },
    setCourseContent(state:any,action:PayloadAction<any>){
        state.courseContent = action.payload;
    },
    setCurrentSection(state:any,action:PayloadAction<any>){
        state.currentSection = action.payload;
    },
    setCurrentSubSection(state:any,action:PayloadAction<any>){
        state.currentSubSection = action.payload;
    },
  },
});

// Export actions
export const { setCourseData,setCourseContent,setCurrentSection,setCurrentSubSection } = courseViewSlice.actions;

// Export reducer
export default courseViewSlice.reducer;
