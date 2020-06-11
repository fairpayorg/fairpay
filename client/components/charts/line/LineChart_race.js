import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';

const LineChart_race = (props) => {
    const [chartData, setChartData] = useState();   
    const { averages } = props;
    const { ageStats, jobStats, raceStats } = averages;
    const raceData = [];
    const raceLabels = [];
    let randomColor = 'rgb(' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ')';
    console.log(averages)
    for(let i = 0; i < raceStats.length; i++){
        raceLabels.push(raceStats[i].race);
        raceData.push(raceStats[i].avg_salary);
    }

    const line = () =>{
        const labels = raceLabels;
        setChartData({
            labels,
            datasets: [
                {
                    label: 'average salary per race',
                    data: raceData,
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
export default LineChart_race;