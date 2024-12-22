import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// initialstate
const initialState: any = {
    step:1,
    editzCourse:false,
    course: null,
    editzSection: false,
    section: null,
    editzSubSection: false,
};

// slice
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep(state:any, action:PayloadAction<number>){
        state.step = action.payload;
    },
    setEditzCourse(state:any, action:PayloadAction<boolean>){
      state.editzCourse = action.payload;
    },
    setCourse(state:any,action:PayloadAction<any>){
      state.course = action.payload;
    },
    setEditzSection(state,action: PayloadAction<boolean>){
      state.editzSection = action.payload;
    },
    setSection(state,action:PayloadAction<any>){
      state.section = action.payload;
    },
    setEditzSubSection(state,action:PayloadAction<boolean>){
      state.editzSubSection = action.payload;
    },
  },
});

// Export actions
export const { setStep,setEditzCourse,setCourse,setEditzSection,setSection,setEditzSubSection } = courseSlice.actions;

// Export reducer
export default courseSlice.reducer;
