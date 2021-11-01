import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import LoadingComponent from "../common/LoadingPage";
import JobCardList from "../jobs/JobCardList";

const CompanyDetail = () => {
  // retrieve handle from url parameters
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  // get the company name through the API
  useEffect(
    function getCompanyAndJobs() {
      // set company state to the handle
      async function getCompany() {
        setCompany(await JoblyApi.getCompany(handle));
      }

      getCompany();
    },
    [handle]
  );

  if (!company) return <LoadingComponent />;

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h3>{company.name}</h3>
      <p>{company.description}</p>
    </div>
  );
};

export default CompanyDetail;
