import React, { useContext, useEffect } from "react";
import { UserContext } from './contexts/userContext';
import { scaleLinear, max, select } from "d3";


/* ***********************************************************************************
    Bar        
/* **********************************************************************************/

const animateRect = (rectRef, height, countTextRef) => {
  const rect = select(rectRef.current);
  rect
    .transition()
    .duration(1000)
    .attr("height", height + 0.5)
    .attr("fill", "green")
  const text = select(countTextRef.current);
  text
    .transition()
    .duration(1000)
    .attr("y", (-5 + height) * -1); 
};

const Bar = props => {
  // Allow us to access this dom element from elsewhere I think? TBD...
  const rectRef = React.createRef();
  const countTextRef = React.createRef();
  const { x, y, width, height, value } = props;
  
  
  useEffect(() => {
    animateRect(rectRef, height, countTextRef);
  }); 
 
  return (
    <g>
      <rect x={x + 5} y={y + 5} width={width} ref={rectRef} />
      <text
        x={x + 40}
        transform="scale(1, -1)"
        fill="white"
        textAnchor="middle"
        style={{fontSize: "6px", fontFamily: "roboto"}}
        ref={countTextRef}
      >
        {'$' + numberWithCommas(Math.round(value)).toString()}
      </text>
    </g>
  );
}


/* ***********************************************************************************
    BarChart - note, selectedFocus prop should be "age", "gender", or "race"         
/* **********************************************************************************/

const BarChart = props => {
  const { positionX, positionY, width, height, selectedFocus = 'race' } = props;
  const { raceList, genderList, ageList } = useContext(UserContext);
  const { user } = useContext(UserContext);  
  console.log("user", user)

  const margin = { top: 20, right: 20, bottom: 30, left: 45 };
  const barChartHeight = height - margin.top - margin.bottom;

  let selectedList = null;
  if(selectedFocus === "gender") selectedList = genderList;
  else if(selectedFocus === "age") selectedList = ageList;
  else selectedList = raceList;
  const numCategories = selectedList.length;
  
  // Generate array of svg text elements to put below bars
  const categoriesLabel = selectedList.map((row, i) => (
    <text
      key={i}
      x={i * 80 + 40}
      y={10}
      textAnchor="middle"
      transform={`scale(1, -1)`}
      style={{ fontSize: "8px", fontFamily: "roboto" }}
    >
      {capitalize(row[selectedFocus])}
    </text>
  ));
  
  // d3 function that sizes the bar heights according to data range
  const y = scaleLinear()
    .domain([0, max(selectedList, data => data.avg_salary)])
    .range([barChartHeight, 0]);
  
  // Generate array of Bar components
  const allBars = selectedList.map((data, i) => (
    <Bar
      key={i}
      x={i * 80}
      y={0}
      width={75}
      height={ ( barChartHeight - y(data.avg_salary) ) / 2 }
      value={data.avg_salary}
    />
  ));

  
  return (
    // <g fill="none">
    //   <rect x="0" y="0" width="100%" height="100%"/>
      <g transform={`translate(${positionX}, ${positionY}) scale(1, -1)`}>
      {/* // <g transform={`translate(35, 400) scale(3, -3)`}> */}
      {allBars}
      {categoriesLabel}
      <line x1="0" y1="80" x2="100" y2="20" stroke="black" />
    </g>
    // </g>
  );
}

/* ***********************************************************************************
    HELPERS       
/* **********************************************************************************/

const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default BarChart;
  