import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Homepage.css";

/** Homepage
 *
 * Shows welcome message or login/register buttons.
 *
 * App -> Routes -> Homepage
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Jobly</h1>
        <p className="lead">All the jobs in one, convenient place.</p>
        {currentUser ? (
          <h2>
            Welcome Back, {currentUser.firstName || currentUser.username}!
          </h2>
        ) : (
          <p>
            <Link className="btn btn-primary m-3" to="/login">
              Log in
            </Link>
            <Link className="btn btn-primary" to="/signup">
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Homepage;
