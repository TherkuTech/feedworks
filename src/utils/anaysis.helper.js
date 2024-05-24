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

export const getRandomColorArray = (size) => {

    const colors = ['#4ade80', '#ff4d4d', '#ffcc29', '#0080ff', '#ff99cc', '#00cc99', '#ff9933', '#cc66ff', '#66ccff', '#ff6666', '#99ff66', '#ff6699'];

    const randomColors = [];

    while (randomColors.length < size) {

        const randomIndex = Math.floor(Math.random() * colors.length);

        const randomColor = colors[randomIndex];

        if (!randomColors.includes(randomColor)) {
            randomColors.push(randomColor);
        }

    }
    return randomColors;
}



