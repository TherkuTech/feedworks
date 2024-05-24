import { useEffect, useState } from "react";
import DoughNuts from "../../components/DoughNut";
import axios from "axios";
import { analysized_feedback } from '../../utils/redux/feedback_slice'
import { useDispatch, useSelector } from "react-redux";
import Upload from "../Feedup/Upload";

const Home = () =>{
    const dispatch = useDispatch();
    const { feedback_analysis } = useSelector((store)=>store.feedback_reducer)

    const form_data = ["The teaching style is engaging and effective.", "The class activities are not stimulating enough.", "The instructor is knowledgeable but lacks clarity in explanations.", "The course materials are outdated and need refreshing."] ;

    useEffect(()=>{
        handle_feedback_analysis(form_data);
    },[])

    const handle_feedback_analysis = async (form_data) =>{
        try{
            const response = await axios.post('http://localhost:5000/llm/categories', {data: form_data });
            const data = response.data;
            dispatch(analysized_feedback(data.data))
        }catch(err){
            console.log(err);
        }
    }

    const [categoried_data,setCategoriedData] = useState({})
    const [labels,setLabels] = useState([])
    const [category_count , setCategoryCount] =useState([])
    const [doughnut_data,setDoughnutData] = useState([])

    const categories_data = () =>{
        console.log(feedback_analysis)
        var mappedData = [];
        
        feedback_analysis.forEach((data,index)=>{
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
            <Upload/>
            <div className="">
                <DoughNuts labels={labels} category_count={category_count} />
                <div className="flex flex-row gap-[16px] p-[16px]">
                    <button 
                        onClick={()=>handle_feedback_analysis(form_data)}
                        className="p-[8px] bg-orange-500 text-white rounded-[18px]"
                        >Retry</button>
                    <button 
                        onClick={categories_data}
                        className="p-[8px] bg-blue-500 text-white rounded-[18px]">
                            Analyze
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home;