import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DoughNuts from "../DoughNut";
import { MdArrowBack } from "react-icons/md";
import BarChartNuts from "../BarChartNuts";

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
            setTopCateKey(labels[0])
        }
    },[home_navi,feedback_analysis])


    const [categoried_data, setCategoriedData] = useState({})
    const [labels, setLabels] = useState([])
    const [category_count, setCategoryCount] = useState([])
    const [doughnut_data, setDoughnutData] = useState([])
    const [current_table_data , setTableData] = useState([])
    // const [mappedData, setMappedData] = useState([])
    const [top_cate_key,setTopCateKey] = useState('')
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

    const handleChangeTableData = (key)=>{
        setTopCateKey(key)
        setTableData(categoried_data[key])
    }


    return(
       <>
       <div className="flex flex-row gap-[30px] relative p-[16px] h-[90vh]">
                
            <button onClick={() => setHomeNavi(1)} className="z-10 absolute top-[5%] -left-[50px] hover:text-white hover:bg-black rounded-full duration-200 ease-in"><MdArrowBack className="text-3xl " /></button>
            <div className="flex flex-col gap-[20px]"> 
                <DoughNuts labels={labels} category_count={category_count} />
                <BarChartNuts labels={labels} datasets={category_count}/>
            </div>
            <div className="flex-1">
                <div className="flex flex-row gap-[20px] rounded-xl bg-zinc-600 p-[8px]">
                    {
                        labels.map((key,index)=>{
                            return(
                                <>  
                                    <button className={`${top_cate_key ===  key ? 'bg-white text-black' : 'text-white'} rounded-xl p-[16px]` } onClick={() => handleChangeTableData(key)} key={key}>{key}</button>
                                </> 
                            )
                        })
                    }
                </div>
                <div className="p-[16px] rounded-xl bg-zinc-600 mt-[15px] shadow-sm h-[550px] overflow-y-auto">
            
                    <div className="flex flex-col gap-[8px]">
                        {
                            current_table_data.map((data, index) => {
                                return (
                                    <>
                                        <div className="flex flex-row gap-[20px] p-[16px] rounded-xl bg-white text-black">
                                            <p>{data.feedback}</p>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
            
                </div>
            </div>
       </div>
           
       </>
    )
}

export default Analytics;