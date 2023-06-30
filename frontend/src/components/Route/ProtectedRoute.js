import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element, isSignedIn }) {
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  return element;
}

export default ProtectedRoute;
