/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import DoughNuts from "../../components/DoughNut";
import axios from "axios";
import { analysized_feedback } from '../../utils/redux/feedback_slice'
import { useDispatch, useSelector } from "react-redux";
import Upload from "../../components/Feedup/Upload";
import Analytics from "../../components/Analytics";

const Home = () =>{
    const [home_navi,setHomeNavi] = useState(1)


    return(
        <>
            <div className="relative">
                {
                    home_navi === 1 ?
                        <Upload setHomeNavi={setHomeNavi} /> : 
                        (home_navi === 2) ?
                            <Analytics home_navi={home_navi} setHomeNavi={setHomeNavi} />
                        :
                        <></>
                }
            </div>
        </>
    )
}

export default Home;