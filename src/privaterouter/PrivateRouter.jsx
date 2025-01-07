import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRouter;
