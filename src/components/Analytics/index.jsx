import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DoughNuts from "../DoughNut";


const Analytics = (props) =>{
    const { home_navi , setHomeNavi } = props;
    // const dispatch = useDispatch();
    const { feedback_analysis, received_feedbacks } = useSelector((store) => store.feedback_reducer)

    
   
    useEffect(()=>{
        console.log(feedback_analysis)
    },[feedback_analysis])

    useEffect(()=>{
        if(home_navi === 2){
            categories_data();
        }
    },[home_navi,feedback_analysis])


    const [categoried_data, setCategoriedData] = useState({})
    const [labels, setLabels] = useState([])
    const [category_count, setCategoryCount] = useState([])
    const [doughnut_data, setDoughnutData] = useState([])

    const categories_data = () => {
        var mappedData = [];
        feedback_analysis.forEach((data, index) => {
            const { category, feedback, action } = data;
            if (!mappedData[category]) {
                mappedData[category] = [];
            }
            mappedData[category].push({ feedback, action });
        })
        setCategoriedData(mappedData);
        const labels = Object.keys(mappedData);
        const data = Object.values(mappedData).map((value) => value.length);
        setLabels(labels)
        setCategoryCount(data)
    }

    return(
       <>
       <div className="flex flex-row gap-[30px]">
            <div>
                <DoughNuts labels={labels} category_count={category_count} />
            </div>
            <div>

            </div>
       </div>
           
       </>
    )
}

export default Analytics;