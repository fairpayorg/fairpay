import { Doughnut } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';

const DoughnutChart_race = (props) => {
    const [chartData, setChartData] = useState();    
    const { averages } = props;
    const { ageStats, jobStats, genderStats, raceStats } = averages;
    const raceData = [];
    const raceLabels = [];
    const colors = [];
    let randomColor;
    console.log(averages)
    for (let i = 0; i < raceStats.length; i++) {
        randomColor = 'rgb(' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ')';
        colors.push(randomColor)
        raceLabels.push(raceStats[i].race);
        raceData.push(raceStats[i].avg_salary);
    }

    const doughnut = () => {
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
export default DoughnutChart_race;