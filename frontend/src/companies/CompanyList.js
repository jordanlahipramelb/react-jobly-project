import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api";
import LoadingComponent from "../common/LoadingPage";
import CompanyCard from "./CompanyCard";

/** Component that returns all companys
 *
 * Children Components: CompanyCard, SearchForm
 */

function CompanyList() {
  console.debug("CompanyList");

  const [companies, setCompanies] = useState(null);

  useEffect(function getCompaniesOnMount() {
    search();
  }, []);

  /** Function used by SearchForm. Triggers when form is submitted. */
  async function search(name) {
    // get company names via search term
    let companies = await JoblyApi.getCompanies(name);
    // set companies to the state
    setCompanies(companies);
  }

  if (!companies) return <LoadingComponent />;

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      {/* pass down search function */}
      <SearchForm searchFor={search} />
      {companies.length ? ( // map through companies and create card components for them
        <div className="CompanyList-list">
          {companies.map((company) => (
            <CompanyCard
              key={company.handle}
              handle={company.handle}
              name={company.name}
              description={company.description}
              logoUrl={company.logoUrl}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default CompanyList;
