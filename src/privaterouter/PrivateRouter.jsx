import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    console.log("User in PrivateRouter on mount:", user); 
    console.log("Loading in PrivateRouter on mount:", loading); 
  }, [user, loading]);

  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    console.log("It user it getting")
    return children;
  }

  return <Navigate to="/signup" state={{ from: location }} replace></Navigate>;
};

export default PrivateRouter;
