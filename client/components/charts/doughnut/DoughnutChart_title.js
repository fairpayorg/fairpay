import { Doughnut } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';

const DoughnutChart_job = (props) => {
    const [chartData, setChartData] = useState();    
    const { averages } = props;
    const { ageStats, jobStats, genderStats, raceStats } = averages;
    const jobData = [];
    const jobLabels = [];
    const colors = [];
    let randomColor;
    console.log(averages)
    for (let i = 0; i < jobStats.length; i++) {
        randomColor = 'rgb(' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ')';
        colors.push(randomColor)
        jobLabels.push(jobStats[i].job_title);
        jobData.push(jobStats[i].avg_salary);
    }

    const doughnut = () => {
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

    useEffect(() => doughnut(), []);

    return (
        <div style={{ height: "400px", width: "600px" }}>
            <Doughnut data={chartData} options={{
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            display: false,
                        }
                    }]
                }
            }} />
        </div>
    )
}
//options={barOptions}
export default DoughnutChart_job;