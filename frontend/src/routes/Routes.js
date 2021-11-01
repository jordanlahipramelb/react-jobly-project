import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "../home/Homepage";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import ProfileForm from "../users/ProfileForm";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/companies">
          <CompanyList />
        </Route>

        <Route exact path="/companies/:handle">
          <CompanyDetail />
        </Route>

        <Route exact path="/jobs">
          <JobList />
        </Route>

        <Route exact path="/login">
          <LoginForm />
        </Route>

        <Route exact path="/signup">
          <SignUpForm />
        </Route>

        <Route exact path="/profile">
          <ProfileForm />
        </Route>

        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default Routes;
