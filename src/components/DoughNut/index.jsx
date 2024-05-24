import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const DoughNuts = (props) => {

    const getRandomColorArray = () => {
        const colors = ['#4ade80', '#ff4d4d', '#ffcc29', '#0080ff', '#ff99cc', '#00cc99', '#ff9933', '#cc66ff', '#66ccff', '#ff6666', '#99ff66', '#ff6699'];

        const randomColors = [];

        while (randomColors.length < 12) {

            const randomIndex = Math.floor(Math.random() * colors.length);

            const randomColor = colors[randomIndex];

            if (!randomColors.includes(randomColor)) {
                randomColors.push(randomColor);
            }

        }
        return randomColors;
    }

    const randomColors = getRandomColorArray();

    return (
        <>
            <div className="relative w-[18rem] h-[18rem] overflow-hidden flex justify-center items-center">
                <Doughnut
                    className=''
                    data={{
                        labels: ['Positive', 'Negative'],
                        datasets: [
                            {
                                label: 'Feedbacks',
                                data: [1000, 50],
                                backgroundColor: ['#4ade80', '#ff4d4d'],
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