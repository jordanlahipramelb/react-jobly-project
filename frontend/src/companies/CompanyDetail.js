import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import LoadingComponent from "../common/LoadingPage";
import JobCardList from "../jobs/JobCardList";

/** Renders Details of Company and displays its jobs.
 * /companies/:handle
 *
 * Children components: JobCardList -> JobCard
 */

const CompanyDetail = () => {
  // retrieve handle from url parameters
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  /** fetch the company data through the API */
  useEffect(
    function getCompanyAndJobsForUser() {
      async function getCompany() {
        // set company state to the handle
        setCompany(await JoblyApi.getCompany(handle));
      }

      getCompany();
    },
    // rerun when handle changes
    [handle]
  );

  if (!company) return <LoadingComponent />;

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      {/* Renders list of jobs. Component also used in JobList. */}
      <JobCardList jobs={company.jobs} />
    </div>
  );
};

export default CompanyDetail;
