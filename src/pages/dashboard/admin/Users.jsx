import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Users = () => {

  // Get all users
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Handle admin status
  const handleUserStatus = (user) => {
    let newRole = user.role === "admin" ? "user" : "admin"; // Toggle role logic
    if (user?.role === "admin") {
      newRole = "customer";
    } else if (user?.role === "storeOwner") {
      newRole = "admin";
    } else {
      newRole = "storeOwner";
    }
    axiosSecure
      .patch(`/users/admin/${user._id}`, { role: newRole }) // Send role in body
      .then((res) => {
        alert(`${user.name}'s role changed to ${newRole}!`);
        refetch(); // Refresh data
      })
      .catch((err) => {
        console.error("Error changing role:", err);
        alert("Failed to change role only admin can access");
      });
  };

  //Delete an user from database
  const handleDeleteUser = (user) => {
    axiosSecure.delete(`/users/${user._id}`).then((res) => {
      alert(`${user.name} is removed from database`);
      refetch();
    });
  };


  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h2 className="text-2xl font-semibold my-4">
          Manage all <span className="text-blue-500">Users</span>
        </h2>
        <h5 className="text-2xl font-semibold my-4">
          Total users: <span className="text-blue-500 ">{users.length}</span>
        </h5>
      </div>
      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">

            {/* head */}
            <thead className="bg-blue-500 text-white rounded-lg">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th className="text-center">Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {/* row 1 */}
              {users.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="text-center">
                    {
                      <button
                        onClick={() => handleUserStatus(user)}
                        className="btn btn-xs  bg-indigo-400 text-white"
                      >
                        {user?.role}
                      </button>
                    }
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn btn-ghost btn-xs text-red-500"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
