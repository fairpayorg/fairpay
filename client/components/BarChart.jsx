import React, { useContext, useEffect } from "react";
import { UserContext } from './contexts/userContext';
import { scaleLinear, max, select } from "d3";


/* ***********************************************************************************
    Bar        
/* **********************************************************************************/

const animateRect = (rectRef, countTextRef, height) => {
  // select is D3 function that returns a handle to first DOM element matching specified selector string
  // In this case we give it a ref to an instance of a Bar component 
  const rect = select(rectRef.current);
  rect
    .transition()
    .duration(1000)
    .attr("height", height + 0.5)
    // .attr("fill", "green")
  const text = select(countTextRef.current);
  text
    .transition()
    .duration(1000)
    .attr("y", (-5 + height) * -1); 
};

const Bar = props => {
  // Allows us to access this dom element from elsewhere I think? TBD...
  const rectRef = React.createRef();
  const countTextRef = React.createRef();
  const { x, y, width, height, value } = props;
  
  // Transition takes time so place in useEffect
  useEffect(() => {
    animateRect(rectRef, countTextRef, height);
  }); 
 
  return (
    <g>
      <rect x={x + 5} y={y + 5} width={width} ref={rectRef} fill="green" fill-opacity="60%"/>
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

  // Not using left/right margins currently
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const barChartHeight = height - margin.top - margin.bottom;

  // Choose a list based on current user selection
  let selectedList = null;
  if(selectedFocus === "gender") selectedList = genderList;
  else if(selectedFocus === "age") selectedList = ageList;
  else selectedList = raceList;
  const numCategories = selectedList.length;
  
  // Returns a new continuous scale that maps from space given in domain to space given in range
  // max takes an array, and optional accessor function that works like map
  const barScale = scaleLinear()
    .domain([0, max(selectedList, row => row.avg_salary)])
    .range([barChartHeight, 0]);
  
  // Generate array of Bars
  const allBars = selectedList.map((row, i) => (
    <Bar
      key={i}
      x={i * 80}
      y={0}
      width={75}
      height={ ( barChartHeight - barScale(row.avg_salary) ) }
      value={row.avg_salary}
    />
  ));

  // Generate Category Labels as an array of svg text elems
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

  return (
      <g transform={`translate(${positionX}, ${positionY}) scale(1, -1)`}>
      {allBars}
      {categoriesLabel}
      <line x1="0" y1="150" x2="325" y2="150" stroke="black" stroke-width="0.3" stroke-opacity="70%" stroke-linecap="round" stroke-dasharray="5,5" fill="none"/>
    </g>
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
  