import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = props => {
  const [user, setUser] = useState({
    name: '',
    jobTitle: '',
    company: '',
  });

  const [raceList, setRace] = useState([]);
  const [genderList, setGender] = useState([]);
  const [ageList, setAge] = useState([]);
  const [aggregateList, setAggregate] = useState([]);
  const [companyList, setCompany] = useState([]);

  const fetchUserData = () => {
    fetch('/api/company')
      .then(res => res.json())
      .then(res => {
        const {
          currentUser,
          raceStats,
          genderStats,
          ageStats,
          jobStats,
          companyData,
        } = res;

        const { name, linkedin_id, job_title } = currentUser;
        setUser(state => ({
          ...state,
          name: name,
          company: linkedin_id,
          jobTitle: job_title,
        }));

        setRace(raceStats);
        setGender(genderStats);
        setAge(ageStats);
        setAggregate(jobStats);
        setCompany(companyData);
      });
  };

  return (
    <UserContext.Provider
      value={{
        fetchUserData,
        user,
        raceList,
        genderList,
        ageList,
        aggregateList,
        companyList,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
