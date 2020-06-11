import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';

const LineChart_age = (props) => {
    const [chartData, setChartData] = useState();
    const { averages } = props;
    const { ageStats, jobStats, raceStats } = averages;
    const ageData = [];
    const ageLabels = [];
    let randomColor = 'rgb(' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ')';

    console.log(averages)
    for(let i = 0; i < ageStats.length; i++){
        ageLabels.push(ageStats[i].age);
        ageData.push(ageStats[i].avg_salary);
    }


    console.log(ageLabels, ageData)

    const line = () =>{
        const labels = ageLabels;
        setChartData({
            labels,
            datasets: [
                {
                    label: 'average salary per age group',
                    data: ageData,
                    backgroundColor: randomColor
                }
            ],
        });
    }

    useEffect(() => line(), []);

    return (
        <div style = {{height: "400px", width: "600px"}}>
            <Line data={chartData} options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
            }}/>
        </div>
    )
}
//options={barOptions}
export default LineChart_age;