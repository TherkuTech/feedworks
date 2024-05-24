import { Outlet , Link} from "react-router-dom"
import React, { useState, useEffect } from "react"
import { VscFeedback } from "react-icons/vsc";
import { RiHomeOfficeFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa6";


const HomeHeader = () => {
    return (
        <>

            <section id="home page header">
                <nav className="p-[16px] border-b-[4px] border-gray-200 shadow-md bg-white">
                    <div className="flex flex-row justify-between">
                        <div className="flex items-center gap-x-[0.5rem]">
                             <span className="text-2xl">Feedworks</span>
                             <VscFeedback className="text-2xl"/>
                        </div>
                        <div className="flex items-center">
                            <ul className="flex flex-row gap-x-[40px] items-center">
                                <li><Link to={''}><RiHomeOfficeFill className="text-3xl"/></Link></li>
                                <li><Link to={''}><FaUserAstronaut className="text-[1.5rem]"/></Link></li>
                                <li><Link to={''}>< IoLogOut className="text-3xl"/></Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>  
            </section>

        </>
    )
}

export default HomeHeader;