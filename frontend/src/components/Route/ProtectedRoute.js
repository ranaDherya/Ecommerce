import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadUser } from "../../store/actions/user-actions";

function ProtectedRoute({ element }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [loaded, setLoaded] = useState(false);
  const userLoader = async () => {
    await dispatch(loadUser());
    setLoaded(true);
  };
  useEffect(() => {
    if (isAuthenticated) setLoaded(true);
    !isAuthenticated && userLoader();
  }, [isAuthenticated]);

  if (loaded && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (loaded && isAuthenticated) {
    return element;
  }
}

export default ProtectedRoute;
