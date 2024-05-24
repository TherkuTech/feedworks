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
            <div className="relative w-[25rem] h-full overflow-hidden flex justify-center items-center">
                <Doughnut
                    className=''
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