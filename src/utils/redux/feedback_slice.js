import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feedback_analysis: [],
}

const feedback_slice = createSlice({
    name: 'feedback_slice',
    initialState,
    reducers: {
        analysized_feedback: (state, action) => {
            return{
                ...state,
                feedback_analysis:action.payload,
            }
        },
    },
});

export const { analysized_feedback } = feedback_slice.actions;
export default feedback_slice.reducer;