/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import { useNavigate , useLocation } from "react-router-dom"


const DashboardLayout = () =>{
    const navigate = useNavigate();
    const location = useLocation();

    return(
        <>
            <div className="flex flex-row h-screen gap-[20px] py-[8px]">
                <div className="w-[250px] bg-white shadow-md p-[20px]">
                    <div className={`w-full    ${location.pathname === '/dashboard/feedbacks' ? ' border-l-2 border-l-gray-700 bg-gray-200 opacity-80' : ''}
                                 duration-200 ease-in text-xl border-2 border-gray-700 p-[8px]`}>
                        <Link to={'/dashboard/feedbacks'}
                            >
                            Feedbacks
                        </Link>    
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