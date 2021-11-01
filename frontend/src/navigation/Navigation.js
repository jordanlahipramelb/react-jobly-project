import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav className=" navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Jobly
      </Link>

      <ul class="nav navbar-nav justify-content-center">
        <li className="nav-item">
          <NavLink className="nav-link" to="/companies">
            Companies
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/jobs">
            Jobs
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
