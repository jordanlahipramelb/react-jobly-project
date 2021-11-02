import React from "react";
import JobCard from "./JobCard";

/** Show list of job cards.
 *
 * Used by both JobList and CompanyDetail to list jobs.
 *
 * JobList -> JobCardList -> JobCard
 * CompanyDetail -> JobCardList -> JobCard
 *
 */

function JobCardList({ jobs, apply }) {
  // map through jobs and create card components for them
  return (
    <div className="JobCardList">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          companyName={job.companyName}
        />
      ))}
    </div>
  );
}

export default JobCardList;
