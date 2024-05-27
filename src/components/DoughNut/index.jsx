/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { getRandomColorArray } from '../../utils/anaysis.helper';
const DoughNuts = (props) => {
    const { labels, category_count } = props
    const [colors, setColors] = useState([])

    useEffect(()=>{
        const rcolors = getRandomColorArray(labels.length)
        setColors(rcolors)
    },[labels])

    return (
        <>
            <div className="w-full shadow-md hover:shadow-md  hover:shadow-gray-400   h-full overflow-hidden flex justify-center items-center">
                <Doughnut
                    className=' rounded-md p-[0.4rem] '
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'Feedbacks',
                                data: category_count,
                                backgroundColor: colors, 
                                borderWidth: 1
                            },

                        ]
                    }}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Feedbacks Pie Chart"
                            },
                            legend: {
                                position: 'right'
                            },
                        },
                    }}
                />
            </div>
        </>
    );

}

export default DoughNuts;