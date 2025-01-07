import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signnUpWithGmail, login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  // Redirection to specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: data.email,
          email: data.email,
        };
        axios.post("https://mega-mart-server.onrender.com/users", userInfo).then((response) => {
          alert("Login successful!");
          document.getElementById("my_modal_5").close();
          navigate(from , {replace : true});
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Please provide valid email & password!");
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
        axios.post("https://mega-mart-server.onrender.com/users", userInfo).then(() => {
          alert("Login done Successfully");
          navigate("/");
          document.getElementById("my_modal_5").close();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
        <div className="modal-box">
          <div className="modal-action flex flex-col justify-center items-center mt-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body"
              method="dialog"
            >
              <h3 className="font-bold text-lg">Please Login!</h3>

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
                {/* <label className="label mt-1">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
              </div>
              {/* Error */}
              {errorMessage ? (
                <p className="text-red-500 text-xs italic">{errorMessage}</p>
              ) : (
                ""
              )}

              {/* Login Btn */}
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary"
                />
              </div>
              <p className="text-center my-2">
                Don't have an account?{" "}
                <Link to="/signup" className="text-red-500 underline ml-2">
                  Signup Now
                </Link>
              </p>
              <button
                htmlFor="my_modal_5"
                onClick={() => document.getElementById("my_modal_5").close()}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>

            <div className="flex gap-5">
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
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
