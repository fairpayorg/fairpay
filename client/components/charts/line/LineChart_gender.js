import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';

const LineChart_gender = (props) => {
    const [chartData, setChartData] = useState();
    const { averages } = props;
    const { ageStats, jobStats, raceStats, genderStats } = averages;
    const genderData = [];
    const genderLabels = [];
    let randomColor = 'rgb(' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ')';
    console.log(averages)
    for(let i = 0; i < genderStats.length; i++){
        genderLabels.push(genderStats[i].gender);
        genderData.push(genderStats[i].avg_salary);
    }

    const line = () =>{
        const labels = genderLabels;
        setChartData({
            labels,
            datasets: [
                {
                    label: 'average salary per gender',
                    data: genderData,
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
export default LineChart_gender;