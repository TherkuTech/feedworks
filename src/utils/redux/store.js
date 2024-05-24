import { configureStore } from '@reduxjs/toolkit'
import feedback_slice from './feedback_slice'


const store = configureStore({
   reducer:{
        feedback_reducer: feedback_slice, 
   } 
})

export default store;