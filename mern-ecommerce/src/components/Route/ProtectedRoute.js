import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  console.log("isAdmin", isAdmin);
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  return (
    <>
      {!loading && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Redirect to="/login" />;
            }
            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default ProtectedRoute;
