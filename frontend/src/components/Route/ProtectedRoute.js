import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Element, verify }) {
  if (verify) {
    return <Navigate to="/login" />;
  }
  return <Element />;
}

export default ProtectedRoute;
