/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import { useNavigate , useLocation } from "react-router-dom"
import { FaCircleUser } from "react-icons/fa6";




const DashboardLayout = () =>{
    const navigate = useNavigate();
    const location = useLocation();

    const [username,setUsername] = useState('');
    const [date,setDate] = useState('');

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

    const fetchUser =async()=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}users/getUser`,{
                headers : {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type':'application/json'
                }})

           setUsername(response.data.username)
            setDate(response.data.createdAt)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
       const newDate = date.split('T')[0];
         setDate(newDate)
    },[date])

    useEffect(()=>{
         fetchUser();
    },[])

    return(
        <>
            <div className="flex flex-row h-screen gap-[20px] py-[8px]">
                <div className="w-[250px] bg-white shadow-md p-[20px]">
                   <div className="flex flex-col gap-y-[2rem] items-center justify-center">
                   <div className='!border-2 !border-gray-500 w-full h-[10rem]  flex items-center flex-col duration-200 ease-in  bg-gray-600 text-white   text-xl  p-[1rem]  rounded-md'>
                       <div className="flex flex-col items-center justify-center  gap-y-[1rem]">
                          <FaCircleUser className="text-5xl text-white"/>
                          <span className="text-xl">{username.charAt(0).toUpperCase() + username.substring(1)}</span>
                       </div> 
                       <span className="text-[12px]">From : {date}</span>
                   </div>
                   <div className={`w-full    ${location.pathname === '/dashboard/feedbacks' ? ' border-l-2 border-l-gray-700 bg-gray-200 opacity-80' : ''}
                                 duration-200 ease-in text-xl border-2 border-gray-700 p-[1rem] text-black rounded-md`}>
                        <Link to={'/dashboard/feedbacks'}
                            >
                           Your Feedbacks
                        </Link>    
                   </div>
                   </div>
                </div>
                <div className="flex-1 h-full flex flex-col">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout;