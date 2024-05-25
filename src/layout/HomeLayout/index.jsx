import { Outlet } from "react-router-dom"
import HomeHeader from "../../components/HomeHeader"
import {useNavigate} from 'react-router-dom';
import { useEffect } from "react";


const HomeLayout = () =>{
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
    
    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
    },[])

    return(
        <>
            <HomeHeader/>
            <div className="bg-[#f7f7f7] ">
                <div className="w-[90%] mx-auto">
                    <Outlet />
                </div>
            </div>
        </> 
    )
}

export default HomeLayout;