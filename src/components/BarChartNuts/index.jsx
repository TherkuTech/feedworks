import { Bar } from "react-chartjs-2";
import { getRandomColorArray } from "../../utils/anaysis.helper";
import { Chart as ChartJS } from 'chart.js/auto';

const BarChartNuts = (props) =>{
    const {labels,datasets} = props;
    const colors = getRandomColorArray(labels.length);
    return(
        <>
            <div className="relative w-[25rem] h-full overflow-hidden flex justify-center items-center">
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