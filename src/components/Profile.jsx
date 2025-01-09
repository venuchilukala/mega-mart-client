import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Profile = ({ user }) => {
  const {logOut} = useAuth()

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

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
      <div className="drawer drawer-end z-10">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? (
                <img src={user?.photoURL} />
              ) : (
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link to="/update-profile">Profile</Link>
            </li>
            <li>
              <a>Order</a>
            </li>
            <li>
              <a>Setting</a>
            </li>
            <li>
              <Link to="/announcement">Announcement</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
