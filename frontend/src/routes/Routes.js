import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "../home/Homepage";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import ProfileForm from "../users/ProfileForm";
import ProtectedRoutes from "./ProtectedRoutes";

const Routes = ({ login, signup }) => {
  return (
    <div className="pt-5">
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
          <SignUpForm signup={signup} />
        </Route>

        <ProtectedRoutes exact path="/companies">
          <CompanyList />
        </ProtectedRoutes>

        <ProtectedRoutes exact path="/jobs">
          <JobList />
        </ProtectedRoutes>

        <ProtectedRoutes exact path="/companies/:handle">
          <CompanyDetail />
        </ProtectedRoutes>

        <ProtectedRoutes path="/profile">
          <ProfileForm />
        </ProtectedRoutes>

        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default Routes;
