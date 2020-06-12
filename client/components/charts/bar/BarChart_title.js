import { Bar } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';

const BarChart_title = (props) => {
    const [chartData, setChartData] = useState();    
    const { averages } = props;
    const { ageStats, raceStats, jobStats } = averages;
    const jobData = [];
    const jobLabels = [];
    const colors = [];
    let randomColor;
    console.log(averages)
    for(let i = 0; i < jobStats.length; i++){
        randomColor = 'rgb(' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ')';
        colors.push(randomColor)
        jobLabels.push(jobStats[i].job_title);
        jobData.push(jobStats[i].avg_salary);
    }

    const bar = () =>{
        const labels = jobLabels;
        setChartData({
            labels,
            datasets: [
                {
                    label: 'average salary per job title',
                    data: jobData,
                    backgroundColor: colors
                }
            ],
        });
    }

    useEffect(() => bar(), []);

    return (
        <div style = {{height: "400px", width: "600px"}}>
            <Bar data={chartData} options={{
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
export default BarChart_title;