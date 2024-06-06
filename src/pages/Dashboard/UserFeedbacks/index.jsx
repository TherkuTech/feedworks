import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



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

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        console.log(token)
        fetchAnalyziedFeedback()
    }, [])

    const [analysized_feedback , setAnalysizedFeedback] = useState([])

    console.log(token)

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

    return (
        <>
            <div className="bg-white shadow-md">
                {
                    analysized_feedback.length === 0 ? <h1>No feedbacks available</h1> :
        
                    analysized_feedback.map((feedback) => {
                        return (
                            <div className=" bg-gray-200 p-[20px] m-[20px]">
                                <Link to={'/analysis/'+feedback._id}>
                                    <h1 className="text-xl font-bold">{feedback.feedback_name}</h1>
                                    <p>{feedback.feedback_text}</p>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default UserFeedbacks;