import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';

const LineChart_title = (props) => {
    const [chartData, setChartData] = useState();    
    const { averages } = props;
    const { ageStats, raceStats, jobStats } = averages;
    const jobData = [];
    const jobLabels = [];
    let randomColor = 'rgb(' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ')';
    console.log(averages)
    for(let i = 0; i < jobStats.length; i++){
        jobLabels.push(jobStats[i].job_title);
        jobData.push(jobStats[i].avg_salary);
    }

    const line = () =>{
        const labels = jobLabels;
        setChartData({
            labels,
            datasets: [
                {
                    label: 'average salary per job title',
                    data: jobData,
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
//options={LineOptions}
export default LineChart_title;