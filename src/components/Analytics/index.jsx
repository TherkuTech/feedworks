/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DoughNuts from "../DoughNut";
import { MdArrowBack } from "react-icons/md";
import BarChartNuts from "../BarChartNuts";
import { unstable_HistoryRouter } from "react-router-dom";
import { Toaster,toast } from "react-hot-toast";

const Analytics = (props) => {
    const { home_navi, setHomeNavi } = props;
    const { feedback_analysis, received_feedbacks } = useSelector((store) => store.feedback_reducer);

    useEffect(() => {
        console.log("Feedback Analysis:", feedback_analysis);
    }, [feedback_analysis]);

    useEffect(() => {
        if (home_navi === 2) {
            categories_data();
            setTopCateKey(labels[0]);
        }
    }, [home_navi, feedback_analysis]);

    const [categoried_data, setCategoriedData] = useState({});
    const [labels, setLabels] = useState([]);
    const [category_count, setCategoryCount] = useState([]);
    const [doughnut_data, setDoughnutData] = useState([]);
    const [current_table_data, setTableData] = useState([]);
    const [selected, setSelected] = useState(0);
    const [uniqueActions, setUniqueActions] = useState([]);
    const [uniqueFeedbacks, setUniqueFeedbacks] = useState([]);
    const [feedbackName,setFeedbackName] = useState('');
    const [top_cate_key, setTopCateKey] = useState("");

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

    const categories_data = () => {
        const mappedData = {};
        feedback_analysis.forEach((data) => {
            const { category, feedback, action } = data;
            if (!mappedData[category]) {
                mappedData[category] = [];
            }
            mappedData[category].push({ feedback, action });
        });

        setCategoriedData(mappedData);

        const labels = Object.keys(mappedData);
        const data = Object.values(mappedData).map((value) => value.length);
        setLabels(labels);
        setCategoryCount(data);

        if (labels.length > 0) {
            setTopCateKey(labels[0]);
            setTableData(mappedData[labels[0]]);
            setSelected(0);
        }
    };

    useEffect(() => {
        const uniqueActions = [...new Set(current_table_data.map(data => data.action))];
        const uniqueFeedbacks = [...new Set(current_table_data.map(data => data.feedback))];
        setUniqueFeedbacks(uniqueFeedbacks);
        setUniqueActions(uniqueActions);
    }, [current_table_data]);

    const handleChangeTableData = (key) => {
        setTopCateKey(key);
        setTableData(categoried_data[key]);
        setSelected(1);
    };

    const handleSaveFeedback = async () => {
        if(feedbackName === ""){toast.error('Please enter feedback name !');return;}
        try {
            const uniqueFeedbacks = Array.from(new Set(feedback_analysis.map(JSON.stringify))).map(JSON.parse);
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}feeds/addFeeds`,
            { 
                feedback_name:feedbackName,
                feedbacks : uniqueFeedbacks,
            },
            {
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            toast.success('Saved Succesfully !')
        } catch (error) {
            toast.error('Please try again later !')
            console.error('Error saving feedback:', error);
        }

    };
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeModal}></div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Save Feedback
                                        </h3>
                                        <div className="mt-2">
                                            <div className="text-sm flex flex-row gap-[8px]">
                                                <input className="bg-gray-200 p-[16px] rounded-[16px] w-[60%]" placeholder="Feedback Title"
                                                onChange={(e)=>setFeedbackName(e.target.value)}></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleSaveFeedback}>
                                    Save
                                </button>
                                <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="p-[1rem] flex gap-x-[1rem] rounded-t-md justify-between items-center ">
                <button onClick={() => setHomeNavi(1)} className="hover:text-white hover:bg-black text-black rounded-full duration-200 ease-in">
                    <MdArrowBack className="text-3xl" />
                </button>
                <p className="text-black text-3xl text-center">Your Analytics</p>
                {/* <button onClick={handleSaveFeedback} className="mt-4 p-2 bg-blue-500 text-white rounded">Save Feedback</button> */}
                <button onClick={openModal} className="mt-4 p-2 bg-blue-500 text-white rounded">Save Feedback</button>

            </div>
            <div className="flex flex-col lg:flex-row gap-[30px] relative p-[20px] lg:h-[90vh] ">
                <div className="flex flex-col gap-[20px] items-center justify-center p-[1rem] rounded-md w-full lg:w-[40%] shadow-md bg-gray-200">
                    <DoughNuts className='hover:shadow-md ' labels={labels} category_count={category_count} />
                    <BarChartNuts className='bg-gray-900' labels={labels} datasets={category_count} />
                </div>
                <div className="flex-1">
                    <div className="flex flex-row gap-[20px] text-xl bg-gray-200 rounded-xl shadow-md shadow-gray-400 p-[8px]">
                        {
                            labels.map((key, index) => (
                                <button
                                    className={`${selected === 1 && top_cate_key === key ? 'bg-black text-white' : 'text-black'} rounded-xl p-[16px]`}
                                    onClick={() => handleChangeTableData(key)}
                                    key={key}
                                >
                                    {key}
                                </button>
                            ))
                        }
                    </div>
                    <div className="p-[16px] rounded-xl mt-[10px] h-[16.5rem] lg:h-[40%] shadow-md shadow-gray-400 thin-scrollbar overflow-y-auto">
                        <div className="flex flex-col gap-[8px]">
                            {
                                uniqueFeedbacks.map((data, index) => (
                                    <div key={index} className="flex text-black flex-row gap-[20px] shadow-md hover:shadow-xl p-[16px] rounded-xl">
                                        <p>{data}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="mt-[1rem]">
                        <p className="rounded-xl shadow-md shadow-gray-400 p-[1rem] text-xl bg-gray-200"><span className="">Actionable Insights</span></p>
                        <div className="p-[16px] rounded-xl mt-[10px] h-[16.3rem] shadow-md shadow-gray-400 thin-scrollbar overflow-y-auto">
                            <div className="flex flex-col gap-[8px]">
                                {
                                    uniqueActions.map((action, index) => (
                                        <div key={index} className="flex text-black flex-row gap-[20px] shadow-md hover:shadow-xl p-[16px] rounded-xl">
                                            <p>{action !== "" ? action : "No Actionable Insights"}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    
                </div>
                <Toaster/>
            </div>
        </>
    );
}

export default Analytics;
