import React, { useEffect } from "react";
import { scaleLinear, max, select } from "d3";

const barTextStyle = {
  fontSize: "1px",
  fontFamily: "verdana"
};

const animateRect = (rectRef, height, countTextRef) => {
  const rect = select(rectRef.current);
  rect
    .transition()
    .duration(650)
    .attr("height", height + 0.5)
    .attr("fill", "green")
  const text = select(countTextRef.current);
  text
    .transition()
    .duration(650)
    .attr("y", (4 + height) * -1);
};

const Bar = props => {

  // ? I think will allow us to access this component from D3 elsewhere. TBD...
  const rectRef = React.createRef();
  const countTextRef = React.createRef();
  const { x, y, width, height, value } = props;
  
  console.log("Bar.props:", props)
  
  useEffect(() => {
    animateRect(rectRef, height, countTextRef);
  });

  return (
    <g>
      <rect x={x + 5} y={y + 5} width={width} ref={rectRef} />
      <text
        x={x + 3.9}
        transform="scale(1, -1)"
        fill="white"
        textAnchor="middle"
        style={barTextStyle}
        ref={countTextRef}
      >
        {Math.round(value)}
      </text>
    </g>
  );
}

const BarChart = props => {

  const { positionX, positionY, width, height, selectedFocus } = props;
  const { jobTitle, race, gender, baseSalary, yrsExperience } = props;
  const { raceList, genderList, ageList } = props;
  console.log("******* BarChart->raceList:", raceList);

  const margin = { top: 20, right: 20, bottom: 30, left: 45 };
  const barChartHeight = height - margin.top - margin.bottom;
  // const barChartHeight = 500;

  // Generate array of svg text elements to put below bars
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text
  const categoriesLabel = raceList.map((row, i) => (
    <text
      key={i}
      x={i * 8 + 3.5}
      y={-3.5}
      textAnchor="middle"
      transform={`scale(1, -1)`}
      style={barTextStyle}
    >
      {row.race}
    </text>
  ));
  
  // d3 function that sizes the bar heights according to data range
  const y = scaleLinear()
  .domain([0, max(raceList, data => data.avg_salary)])
  .range([barChartHeight, 0]);
  
  // Generate array of Bar components
  const allBars = raceList.map((data, i) => (
    <Bar
      key={i}
      x={i * 8}
      y={0}
      width={7.8}
      height={(barChartHeight - y(data.avg_salary)) / 2}
      value={data.avg_salary}
    />
  ));

  console.log("allBars", allBars)
  console.log("categoriesLabel", categoriesLabel)
  
  return (
    <g transform={`translate(${positionX}, ${positionY}) scale(1, -1)`}>
      {allBars}
      {categoriesLabel}
    </g>
  );
}



export default BarChart;
  
// <g fill="green">
// <rect x="0" y="0" width="100%" height="100%"/>
// <g fill="none" stroke="black" stroke-width="5">
//   <circle cx="150" cy="40" r="25" />
//   <circle cx="40" cy="60" r="25" />
// </g>
// </g>