/* eslint-disable react/jsx-key */


import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";

import { Link ,useNavigate} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";



const UserFeedbacks = () => {

    function getCookieValue(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

    const token = getCookieValue('token')
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        console.log(token)
        fetchAnalyziedFeedback()
    }, [])

    const [analysized_feedback , setAnalysizedFeedback] = useState([])

    const fetchAnalyziedFeedback = async () =>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}feeds/getUserFeedbacks`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            setAnalysizedFeedback(response.data.analysied_feedbacks)
        }catch(err){
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            console.log(id)
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}feeds/deleteFeedback`,{
                    id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response) {
                fetchAnalyziedFeedback();
                toast.success("Deleted Successfully !");
            }
        } catch (err) {
            toast.error('Deletion Failed !');
            console.log(err.message);
        }
    };
    

    return (
        <>
            <div className="bg-white shadow-md">
                {
                    analysized_feedback.length === 0 ? <h1>No feedbacks available</h1> :
                    analysized_feedback.map((feedback) => {
        
                        return (
                            <div className=" bg-gray-200 p-[1rem] rounded-md shadow-md m-[20px] flex justify-center items-center ">
                                <Link to={'/analysis/'+feedback._id} className="flex items-center gap-x-[3rem] w-full">
                                    <h1 className="text-xl font-bold bg-gray-200 text-black p-[1.5rem] w-[60%] rounded-md">{feedback.feedback_name}</h1>
                                    <p>{feedback.feedback_text}</p>
                                </Link>
                                <button onClick={()=>handleDelete(feedback._id)} className="text-xl p-[1rem] text-white bg-red-600 rounded-md flex justify-center items-center gap-x-[1rem]">Delete<MdDelete className="text-2xl"/></button>
                            </div>
                        )
                    })  
                }
            </div>
            <Toaster/>
        </>
    )
}

export default UserFeedbacks;