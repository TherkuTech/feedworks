import { useEffect } from "react";
import DoughNuts from "../../components/DoughNut";
import axios from "axios";
import { analysized_feedback } from '../../utils/redux/feedback_slice'
import { useDispatch, useSelector } from "react-redux";

const Home = () =>{
    const dispatch = useDispatch();
    const { feedback_analysis } = useSelector((store)=>store.feedback_reducer)

    const form_data = ["The teaching style is engaging and effective.", "The class activities are not stimulating enough.", "The instructor is knowledgeable but lacks clarity in explanations.", "The course materials are outdated and need refreshing."] ;


    useEffect(()=>{
        handle_feedback_analysis(form_data);
    },[])


    useEffect(()=>{
        console.log("redux data",feedback_analysis)
    },[feedback_analysis])

    const handle_feedback_analysis = async (form_data) =>{
        try{
            const response = await axios.post('http://localhost:5000/llm/categories', {data: form_data });
            const data = response.data;
            dispatch(analysized_feedback(data.data))
        }catch(err){
            console.error(err);
        }
    }

    return(
        <>
            <div className="">
                <DoughNuts />
            </div>
        </>
    )
}

export default Home;