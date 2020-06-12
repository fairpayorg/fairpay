import { Doughnut } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';

const DoughnutChart_age = (props) => {
    const [chartData, setChartData] = useState();
    const { averages } = props;
    const { ageStats, jobStats, raceStats } = averages;
    const ageData = [];
    const ageLabels = [];
    const colors = [];
    let randomColor;
    console.log(averages)
    for (let i = 0; i < ageStats.length; i++) {
        randomColor = 'rgb(' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ',' + (Math.round(Math.random() * 255)) + ')';
        colors.push(randomColor)
        ageLabels.push(ageStats[i].age);
        ageData.push(ageStats[i].avg_salary);
    }


    console.log(ageLabels, ageData)

    const doughnut = () => {
        const labels = ageLabels;
        setChartData({
            labels,
            datasets: [
                {
                    label: 'average salary per age group',
                    data: ageData,
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
export default DoughnutChart_age;