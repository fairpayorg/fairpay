import { Bar } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';

const BarChart_race = (props) => {
    const [chartData, setChartData] = useState();   
    const { averages } = props;
    const { ageStats, jobStats, raceStats } = averages;
    const raceData = [];
    const raceLabels = [];
    const colors = [];
    let randomColor;
    console.log(averages)
    for(let i = 0; i < raceStats.length; i++){
        randomColor = 'rgb(' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ')';
        colors.push(randomColor)
        raceLabels.push(raceStats[i].race);
        raceData.push(raceStats[i].avg_salary);
    }

    const bar = () =>{
        const labels = raceLabels;
        setChartData({
            labels,
            datasets: [
                {
                    label: 'average salary per race',
                    data: raceData,
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
export default BarChart_race;