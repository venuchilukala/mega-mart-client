import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

const Main = () => {
  const { loading } = useContext(AuthContext);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Navbar />
          <div className="min-h-screen pt-16">
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Main;
