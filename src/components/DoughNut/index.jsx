import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const DoughNuts = (props) => {
    const { labels, category_count } = props
    const [colors, setColors] = useState([])

    useEffect(()=>{
        getRandomColorArray(labels.length)
    },[labels])

    const getRandomColorArray = (size) => {

        const colors = ['#4ade80', '#ff4d4d', '#ffcc29', '#0080ff', '#ff99cc', '#00cc99', '#ff9933', '#cc66ff', '#66ccff', '#ff6666', '#99ff66', '#ff6699'];

        const randomColors = [];

        while (randomColors.length < size) {

            const randomIndex = Math.floor(Math.random() * colors.length);

            const randomColor = colors[randomIndex];

            if (!randomColors.includes(randomColor)) {
                randomColors.push(randomColor);
            }

        }
        setColors(randomColors)
    }


    return (
        <>
            <div className="relative w-[30rem] h-[30rem] overflow-hidden flex justify-center items-center">
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