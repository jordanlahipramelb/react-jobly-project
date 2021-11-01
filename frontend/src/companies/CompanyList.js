import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api";
import LoadingComponent from "../common/LoadingPage";
import ComanyCard from "./CompanyCard";
import CompanyCard from "./CompanyCard";

const CompanyList = () => {
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

  // map through companies and create card components for them
  let companiesList = (
    <div className="CompanyList-list ">
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
  );

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      {/* pass down search function */}
      <SearchForm searchFor={search} />
      {companies.length ? companiesList : <p>Sorry, no results were found.</p>}
    </div>
  );
};

export default CompanyList;
