import React, { useEffect, useState } from "react";
import { IoBagAdd } from "react-icons/io5";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [stores, setStores] = useState([]);

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axiosSecure.get("/stores");
        setStores(response.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);


  const onSubmit = async (data) => {

    // Store validation
    const isValidStore = stores.some((store) => store._id === data.storeId);
    if (!isValidStore) {
      Swal.fire({
        icon: "error",
        title: "Invalid Store",
        text: "Please select a valid store.",
        showConfirmButton: true,
      });
      return;
    }

    // hosting image to imgbb
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
   
    if (hostingImg.data.success) {
      const productItem = {
        name: data.name,
        price: data.price,
        discountPrice: data.discountPrice,
        isOnOffer: data.isOnOffer,
        brand: data.brand,
        stock: data.stock,
        category: data.category,
        storeId: data.storeId,
        image: hostingImg.data.data.display_url,
        description: data.description,
      };
     

      const postItem = await axiosSecure.post("/products", productItem);
      if (postItem) {
        reset();
        Swal.fire({
          icon: "success",
          title: "Product added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Upload a New <span className="text-blue-500">Product</span>
      </h2>

      {/* Form  */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 1st row ----- Product Name*/}
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Product Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Product name"
              className="input input-bordered w-full "
            />
          </div>

          {/* 2nd row ----- category and price*/}
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
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full "
              />
            </div>
          </div>

          {/* 3rd row ----- Offer and discount price*/}
          <div className="flex items-center gap-4">
            {/* offer */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Offer*</span>
              </label>
              <select
                {...register("isOnOffer", { required: true })}
                className="select select-bordered"
              >
                <option disabled defaultValue="default">
                  Choose Offer
                </option>
                <option value="true">On Offer</option>
                <option value="false">No Offer</option>
              </select>
            </div>

            {/*discount prices */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Discount Price*</span>
              </label>
              <input
                type="number"
                {...register("discountPrice", { required: true })}
                placeholder="Dicount price"
                className="input input-bordered w-full "
              />
            </div>
          </div>

          {/* 4th row ----- brand and stock*/}
          <div className="flex items-center gap-4">
            {/* offer */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Brand*</span>
              </label>
              <input
                type="text"
                {...register("brand", { required: true })}
                placeholder="Brand name"
                className="input input-bordered w-full "
              />
            </div>

            {/*discount prices */}
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Stock*</span>
              </label>
              <input
                type="number"
                {...register("stock", { required: true })}
                placeholder="Stock"
                className="input input-bordered w-full "
              />
            </div>
          </div>

          {/* 5th row ---- store name */}
          <div className="form-control w-full ">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Store Name*</span>
              </label>
              <select
                {...register("storeId", { required: true })}
                className="select select-bordered"
              >
                <option disabled defaultValue="default">
                  Select a store
                </option>
                {stores?.length > 0 ? (
                  stores.map((store) => (
                    <option key={store._id} value={store._id}>
                      {store.name}
                    </option>
                  ))
                ) : (
                  <option></option>
                )}
              </select>
            </div>
          </div>

          {/* 6th row ----- Product description */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Product Description*</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Describe your product"
              {...register("description", { required: true })}
            ></textarea>
          </div>

          {/* 7th row --- product photo */}
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
              required
            />
          </div>
          <button className="btn btn-primary text-white px-6">
            {" "}
            Add Product
            <IoBagAdd />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
