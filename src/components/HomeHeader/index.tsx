import { Outlet , Link} from "react-router-dom"
import React, { useState, useEffect } from "react"


const HomeHeader = () => {
    return (
        <>

            <section id="home page header">
                <nav className="p-[16px] border-b-[4px] border-gray-200 shadow-md bg-white">
                    <div className="flex flex-row justify-between">
                        <div className="w-[40px] h-[40px] bg-red-500 rounded-xl">
                            
                        </div>
                        <div className="flex items-center">
                            <ul className="flex flex-row gap-[16px]">
                                <li><Link to={''}>Home</Link></li>
                                <li><Link to={''}>Profile</Link></li>
                                <li><Link to={''}>Logout</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>  
            </section>

        </>
    )
}

export default HomeHeader;