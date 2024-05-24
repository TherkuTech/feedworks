// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { analysized_feedback } from "./redux/feedback_slice";
// import React from "react";

// export const handle_feedback_analysis = async (form_data) => {
//     const dispatch = useDispatch();
//     try {
//         console.log(form_data)
//         const response = await axios.post('http://localhost:5000/llm/categories', { data: form_data });
//         const data = response.data;
//         dispatch(analysized_feedback(data.data))
//         return true;
//     } catch (err) {
//         console.log(err)
//         return false;
//     }
// }

