import React from 'react';

const TitleCount = ({ titles }) => {
  return (
    <React.Fragment>
      {titles
        ? titles.map(({ job_title, total }) => (
            <p>
              {job_title}: {total} submissions
            </p>
          ))
        : ''}
    </React.Fragment>
  );
};

export default TitleCount;
