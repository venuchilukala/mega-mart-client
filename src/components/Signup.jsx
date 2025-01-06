import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { set, useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");
  const { createUser, signnUpWithGmail, updateUserProfile } =
    useContext(AuthContext); 

  const axiosPublic = useAxiosPublic()

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(data.name, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then(() => {
            alert("Signin done Successfully");
            navigate(from, { replace: true });
          });
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };

  const handleLogin = () => {
    signnUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic.post("/users", userInfo).then(() => {
          alert("Signin done Successfully");
          document.getElementById("my_modal_5").close();
          navigate("/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-md shadow flex items-center justify-center mx-auto bg-white w-full my-20 relative">
      <div className="modal-action flex flex-col justify-center items-center mt-0 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg">Create an account!</h3>

          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              placeholder="name"
              className="input input-bordered"
              {...register("name")}
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password")}
            />

          </div>
          
          {/* Error */}

          {errorMessage ? (
            <p className="text-red text-xs italic">{errorMessage}</p>
          ) : (
            ""
          )}

          {/* Login Btn */}
          <div className="form-control mt-6">
            <input type="submit" value="Signup" className="btn btn-primary" />
          </div>
          <p className="text-center my-2">
            Have an account?{" "}
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="text-red-500 underline ml-2"
            >
              Login
            </button>
          </p>

          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-1 top-2"
          >
            ✕
          </Link>
        </form>

        <div className="flex gap-5 my-5">
          <button
            className="btn btn-circle hover:bg-primary hover:text-white"
            onClick={handleLogin}
          >
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-primary hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-primary hover:text-white">
            <FaXTwitter />
          </button>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Signup;
