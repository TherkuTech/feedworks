/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Bar } from "react-chartjs-2";
import { getRandomColorArray } from "../../utils/anaysis.helper";
import { Chart as ChartJS } from 'chart.js/auto';
import { useEffect, useState } from "react";


const BarChartNuts = (props) =>{
    const {labels,datasets} = props;
    const [colors,setColors] = useState([])
    useEffect(()=>{
        const rcolors = getRandomColorArray(labels.length)
        setColors(rcolors)
    },[labels])
    return(
        <>
            <div className="relative bg-[#f7f7f7] shadow-md hover:shadow-md rounded-md hover:shadow-gray-400 p-[0.2rem] w-full h-full overflow-hidden flex justify-center items-center">
                <Bar
                    data={{
                        labels:labels,
                        datasets: [
                            {
                                label: 'Feedback Bar Chart',
                                data: datasets,
                                backgroundColor: colors,
                                borderWidth: 1
                            },

                        ]
                    }}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Feedbacks Bar Chart"
                            },
                            legend: {
                                position:"bottom"
                            }
                        }
                    }}
                />
            </div>
        </>
    )
}

export default BarChartNuts;