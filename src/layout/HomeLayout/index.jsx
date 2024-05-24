import { Outlet } from "react-router-dom"
import HomeHeader from "../../components/HomeHeader"


const HomeLayout = () =>{
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