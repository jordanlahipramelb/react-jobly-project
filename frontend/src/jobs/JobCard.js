import React, { useContext, useState, useEffect } from "react";
import "./JobCard.css";
import UserContext from "../auth/UserContext";

function JobCard({ id, title, salary, equity, companyName }) {
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  useEffect(
    function updateAppliedStatus() {
      setApplied(hasAppliedToJob(id));
    },
    [id, hasAppliedToJob]
  );

  /** Apply for a job */
  async function handleApply(evt) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
    <div className="JobCard card">
      {" "}
      {applied}
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <p>{companyName}</p>
        {salary && (
          <div>
            <small>Salary: {formatSalary(salary)}</small>
          </div>
        )}
        {equity !== undefined && (
          <div>
            <small>Equity: {equity}</small>
          </div>
        )}
        <button
          className="btn btn-danger font-weight-bold text-uppercase float-right"
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? "applied" : "apply"}
        </button>
      </div>
    </div>
  );
}

/** Render integer salary with commas */

function formatSalary(number) {
  let str = number.toString();
  let num = str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "$" + num;
}

export default JobCard;
