import { Bar } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';

const BarChart_gender = (props) => {
    const [chartData, setChartData] = useState();
    const { averages } = props;
    const { ageStats, jobStats, raceStats, genderStats } = averages;
    const genderData = [];
    const genderLabels = [];
    const colors = [];
    let randomColor;
    console.log(averages)
    for(let i = 0; i < genderStats.length; i++){
        randomColor = 'rgb(' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ')';
        colors.push(randomColor)
        genderLabels.push(genderStats[i].gender);
        genderData.push(genderStats[i].avg_salary);
    }

    const bar = () =>{
        const labels = genderLabels;
        setChartData({
            labels,
            datasets: [
                {
                    label: 'average salary per gender',
                    data: genderData,
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
export default BarChart_gender;