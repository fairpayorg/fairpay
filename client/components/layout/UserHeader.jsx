import React, { useContext } from 'react';
import { UserContext } from '../contexts/userContext';

const UserHeader = () => {
  const { user } = useContext(UserContext);
  const { name, jobTitle, company } = user;

  return (
    <div className="current_user_header">
      <h2 id="current_user_name">Hello {name}</h2>
      <label id="current_user_label">
        {jobTitle} at {company}
      </label>
    </div>
  );
};

export default UserHeader;
