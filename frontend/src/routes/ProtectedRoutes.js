import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** Component that helps redirect non users from private routes.
 *
 * currentUser: Global variable, Provided from UserContext in App in order to obtain currentUser, which verifies if a user is logged in.
 */

function ProtectedRoutes({ exact, path, children }) {
  // passed down from App
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default ProtectedRoutes;
