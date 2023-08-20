import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadUser } from "../../store/actions/user-actions";

function ProtectedRoute({ element, isSignedIn }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [loaded, setLoaded] = useState(false);
  const userLoader = async () => {
    await dispatch(loadUser());
    setLoaded(true);
  };
  useEffect(() => {
    !isAuthenticated && userLoader();
  });
  if (loaded && isSignedIn === false) {
    setLoaded(false);
    return <Navigate to="/login" />;
  }
  return element;
}

export default ProtectedRoute;
