import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api";
import LoadingComponent from "../common/LoadingPage";
import JobCardList from "./JobCardList";

/** Component that returns all jobs
 *
 * Children Components: JobCardList -> JobCard, SearchForm
 */

function JobList() {
  const [jobs, setJobs] = useState(null);

  /** fetch jobs data via search through the API */
  useEffect(function getAllJobsOnMount() {
    search();
  }, []);

  /** Function used by SearchForm. Triggers when form is submitted. */
  async function search(title) {
    // get job names via search term
    let jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
  }

  // Return loading if no jobs present yet
  if (!jobs) return <LoadingComponent />;

  return (
    <div className="JobList col-md-8 offset-md-2">
      <SearchForm searchFor={search} />
      {jobs.length ? (
        <JobCardList jobs={jobs} />
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default JobList;
