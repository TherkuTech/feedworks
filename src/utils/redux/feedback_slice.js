import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    received_feedbacks:[],
    feedback_analysis: [],
}

const feedback_slice = createSlice({
    name: 'feedback_slice',
    initialState,
    reducers: {

        feedbacks_received:(state,action)=>{
            return{
                ...state,
                received_feedbacks:action.payload,
            }
        },

        analysized_feedback: (state, action) => {
            return{
                ...state,
                feedback_analysis:action.payload,
            }
        },
    },
});

export const { analysized_feedback, feedbacks_received } = feedback_slice.actions;
export default feedback_slice.reducer;