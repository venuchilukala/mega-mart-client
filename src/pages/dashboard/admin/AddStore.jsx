import React, { useEffect, useState } from "react";
import { IoBagAdd } from "react-icons/io5";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AddStore = () => {
  const { register, handleSubmit, reset } = useForm();
  
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

 
  const onSubmit = async (data) => {
    console.log(data)
    // hosting banner image to imgbb
    const bannerImageFile = { image: data.bannerImage[0] };
    console.log(bannerImageFile)
    const hostingBannerImg = await axiosPublic.post(image_hosting_api, bannerImageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(hostingBannerImg)

    // hosting icon image to imgbb
    const iconImageFile = { image: data.iconImage[0] };
    const hostingIconImg = await axiosPublic.post(image_hosting_api, iconImageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
   
    if (hostingBannerImg.data.success && hostingIconImg.data.success) {
      const newStoreItem = {
        name: data.name,
        location : `Mall Level ${data.floor}, Mega Mart, Jubilee Hills, HYD`,
        category: data.category,
        bannerImage: hostingBannerImg.data.data.display_url,
        iconImage: hostingIconImg.data.data.display_url,
        floor : data.floor,
        contact: data.contact,
        description: data.description,
      };
     
      console.log("Store Data",newStoreItem)

      const storeItem = await axiosPublic.post("/stores", newStoreItem);
      if (storeItem) {
        reset();
        Swal.fire({
          icon: "success",
          title: "Store added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Create a new <span className="text-blue-500">Store</span>
      </h2>

      {/* Form  */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 1st row ----- Store Name*/}
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Store Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Product name"
              className="input input-bordered w-full "
            />
          </div>

          {/* 2nd row ----- category and floor*/}
          <div className="flex items-center gap-4">
            {/* categories */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
              >
                <option disabled defaultValue="default">
                  Select a category
                </option>
                <option value="fashion">Fashion</option>
                <option value="electronic">Electronics</option>
                <option value="food">Food</option>
                <option value="beauty">Beauty</option>
                <option value="footwear">Footwear</option>
                <option value="home">Home</option>
                <option value="grocery">Grocery</option>
                <option value="sports">Sports</option>
                <option value="entertainment">Entertainment</option>
              </select>
            </div>

            {/* prices */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Floor*</span>
              </label>
              <input
                type="number"
                {...register("floor", { required: true })}
                placeholder="Floor"
                className="input input-bordered w-full "
              />
            </div>
          </div>

          {/* 3rd row ----- Contact Number*/}
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Contact*</span>
            </label>
            <input
              type="text"
              {...register("contact", { required: true })}
              placeholder="Contact Number"
              className="input input-bordered w-full "
            />
          </div>

          
          {/* 4th row ----- store description */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Store Description*</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Describe your store"
              {...register("description", { required: true })}
            ></textarea>
          </div>

          {/* 5th row --- store banner photo */}
          <div className="form-control w-full my-6">
          <label className="label">
              <span className="label-text">Banner Image*</span>
            </label>
            <input
              {...register("bannerImage", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
              required
            />
          </div>

          {/* 6th row --- store icon photo */}
          <div className="form-control w-full my-6">
          <label className="label">
              <span className="label-text">Icon Image*</span>
            </label>
            <input
              {...register("iconImage", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
              required
            />
          </div>
          <button className="btn btn-primary text-white px-6">
            {" "}
            Add Store
            <IoBagAdd />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStore;
