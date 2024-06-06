/* eslint-disable no-unused-vars */
import { Link} from "react-router-dom"
import { RiHomeOfficeFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa6";
import { GiPapers } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";

const HomeHeader = () => {
    const [username,setUsername] = useState('')
    const navigate = useNavigate();

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

    const getUserData = async()=>{
        try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}users/getUser`,{
            headers : {
                'Authorization': `Bearer ${token}`,
                'Content-Type':'application/json'      
            }
        })
        setUsername(response.data.username)
    }catch(err){
        console.log(err)
    }
    }

    useEffect(()=>{
       getUserData();
    },[])

    const handleLogout=()=>{
        document.cookie = "token='';max-age=0"
        window.location.href='/login'
    }

    return (
        <>
            <section id="home page header">
                <nav className="p-[16px] border-b-[4px] border-gray-200 shadow-md bg-white">
                    <div className="flex flex-row justify-between">
                        <div className="flex items-center gap-x-[0.5rem]">
                             <span className="text-2xl">Feedworks</span>
                             <GiPapers className="text-2xl"/>
                        </div>
                        <div className="flex items-center">
                            <ul className="flex flex-row gap-x-[35px] items-center">
                                <li className="cursor-pointer" title="home"><Link to={'/home'}><RiHomeOfficeFill className="text-3xl"/></Link></li>
                                <li className="cursor-pointer" title="dashboard"><Link to={'/dashboard'}><TbLayoutDashboardFilled className="text-3xl" /></Link></li>
                                <li className="cursor-pointer" onClick={()=>handleLogout()}><IoLogOut className="text-3xl"/></li>       
                                <li className="flex justify-center items-center cursor-pointer gap-x-[0.5rem] bg-black px-[0.8rem] py-[0.3rem] rounded-md"><FaUserAstronaut className="text-[1.5rem] text-white"/> <span className="text-xl text-white">{username}</span></li>
                            </ul>
                        </div>
                    </div>
                </nav>  
            </section>

        </>
    )
}

export default HomeHeader;