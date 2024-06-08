/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getCookieValue } from "../../utils/cookie";
import Analytics from "../../components/Analytics";
import {  useDispatch, useSelector } from "react-redux";
import { analysized_feedback } from "../../utils/redux/feedback_slice";
import Chatbot from "../../components/Chatbot";
import ChatBotScroll from "../../components/ChatBotScroll";


const FeedAnalysis = () =>{
    const {feed_id} = useParams()
    const token = getCookieValue('token')
    const dispatch = useDispatch()
    useEffect(()=>{
        fetchFeedAnalysis()
    },[feed_id])

    const fetchFeedAnalysis = async () =>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}feeds/getAFeedbacks?feed_id=${feed_id}`,{
                headers:{
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            console.log(response.data.feed_data)
            dispatch(analysized_feedback(response.data.feed_data.feedbacks))
        } catch (err) {
            console.log(err)
        }
    }

    const scrollToChatbot = () => {
        const chatbotElement = document.getElementById('chat-bot');
        if (chatbotElement) {
            chatbotElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="bg-white shadow-md">
                <Analytics home_navi={2} setHomeNavi ={''} push_back_to="/dashboard"/>
                <Chatbot />
                <ChatBotScroll/>
            </div>
        </>
    )
}
export default FeedAnalysis;