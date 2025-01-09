import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import {
  FaUsers,
  FaPlusCircle,
  FaEdit,
  FaRegUser,
  FaHome,
  FaQuestionCircle,
} from "react-icons/fa";
import { FaCartShopping, FaStore } from "react-icons/fa6";
import logo from "/logo.png";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import Signup from "../components/Signup";
import Login from "../components/Login";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <FaHome />
        Home
      </Link>
    </li>
    <li>
      <Link to="/store">
        <FaStore />
        Stores
      </Link>
    </li>
    <li>
      <Link to="/support">
        <FaQuestionCircle />
        Support
      </Link>
    </li>
  </>
);

const DashBoardLayout = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { loading } = useAuth();
  const {logOut} = useAuth()

  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || "/"


  const handleLogout = () => {
    logOut().then(()=>{
      alert("Logout done successfully")
      navigate(from , {replace : true})
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div>
      {isAdmin ? (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
            {/* Page content here */}
            <div className="flex justify-between items-center mx-4">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
              >
                <MdDashboardCustomize />
              </label>
              <button onClick={handleLogout} className="btn btn-success rounded-full px-6 text-white lg:hidden flex items-center gap-2">
                <FaRegUser /> Logout
              </button>
            </div>
            <div className="mt-5 md:mt-2 mx-4">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <Link to="/dashboard" className="flex justify-start mb-3">
                  <img src={logo} alt="logo" className="w-20" />
                  <span className="badge badge-primary">Admin</span>
                </Link>
              </li>
              <hr />
              <li className="mt-3">
                <Link to="/dashboard">
                  <MdDashboard />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/orders">
                  <FaCartShopping />
                  Manage Orders
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-product">
                  <FaPlusCircle />
                  Add Product
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-product">
                  <FaEdit />
                  Manage Product
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-store">
                  <FaPlusCircle />
                  Add Store
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-store">
                  <FaEdit />
                  Manage Store
                </Link>
              </li>
              <li>
                <Link to="/dashboard/users" className="mb-3">
                  <FaUsers />
                  All Users
                </Link>
              </li>
              <hr />
              {/* Shares Links */}
              {sharedLinks}
            </ul>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default DashBoardLayout;
