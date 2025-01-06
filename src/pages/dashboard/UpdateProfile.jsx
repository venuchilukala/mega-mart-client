import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import {useLocation, useNavigate} from "react-router-dom"

const UpdateProfile = () => {
  const {updateUserProfile} = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || "/"


  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;
    console.log(name, photoURL)
    updateUserProfile(name, photoURL).then(()=>{
      alert("Profile Updated successfully")
      navigate(from, {replace : true})
    }).catch((error)=>{
      console.log("Error occured while updating profile")
    })

  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold">Update your profile</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered"
              {...register("name")}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered"
              {...register("photoURL")}
              required
            />

            {/* <input type="file" className="file-input w-full max-w-xs" /> */}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
