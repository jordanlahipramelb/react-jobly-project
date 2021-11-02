import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navigation from "./navigation/Navigation";
import Routes from "./routes/Routes";
import LoadingPage from "./common/LoadingPage";
import jwt from "jsonwebtoken";
import JoblyApi from "./api";
import UserContext from "./auth/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "jobly-token";

/** Jobly Application
 *
 * - currentUser: user obj from API. How to tell if someone is logged in. This is passed through the UserContext.
 * - userInfoLoaded: boolean to say whether the user's info was loaded or not. This handles the Loading component.
 * - token: for logged in users in order to authenticate with JWT
 *
 * App -> Routes
 */

function App() {
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwt.decode(token);

            // adds token to API class in order to use it to call API
            JoblyApi.token = token;

            // API returns user
            let currentUser = await JoblyApi.getCurrentUser(username);
            setCurrentUser(currentUser);
            setApplicationIds(new Set(currentUser.applications));
          } catch (err) {
            console.error("Error with loadUserInfo");
            setCurrentUser(null);
          }
        }
        // set to true when the info is loaded
        setUserInfoLoaded(true);
      }
      // set to false while async getCurrentUser runs.
      // Once data/error is fetched, this is set back to false in order to control the Loading component
      setUserInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  /** Handles site-wide logout.
   * Empties current user and token
   */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide signup */

  async function signup(data) {
    try {
      let token = await JoblyApi.signup(data);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login */

  async function login(data) {
    try {
      // call API signUp, returns token
      let token = await JoblyApi.login(data);

      setToken(token);

      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** Check if a job has been applied for. */

  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */

  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!userInfoLoaded) return <LoadingPage />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}
      >
        <div>
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
