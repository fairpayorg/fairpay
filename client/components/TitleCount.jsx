import React from 'react';

function TitleCount(props) {
  function renderTitles() {
    let output = [];
    for (let i = 0; i <= props.titles.length - 1; i++) {
      let  elem = (
        <p key={i}>
          {props.titles[i].job_title}: {props.titles[i].total} submissions
        </p>
      );
      output.push(elem);
    }
    return output;
  }

  console.log(props.titles);
  return (
    <div>
      {props.titles ? renderTitles() : ''}
    </div>
  );
}

export default TitleCount;
