import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";

const Cards = (props) => {
  const { product } = props;
  const { _id, name, price, discountPrice, isOnOffer, brand, stock, category, store, image, createdAt} = product;

  const [cart, refetch] = useCart()

  const [isFavourite, setFavourite] = useState(false);
  const { user } = useContext(AuthContext);

  const location = useLocation()
  const navigate = useNavigate()

  const handleFavouriteClick = () => {
    setFavourite(!isFavourite);
  };

  // https://mega-mart-server.onrender.com/carts
  // {
  //   "productId": "6777e2411de6b0da106d1a37", 
  //   "quantity": 1, 
  //   "email": "raj@gmail.com"
  // }
  const handleAddToCart = (product) => {
    console.log(product)
    if (user && user?.email) {
      const cartItem = {
        productId: _id,
        quantity : 1,
        email: user.email,
      };

      console.log(cartItem)
      fetch("https://mega-mart-server.onrender.com/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data isd", data)
          if (data) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Item added to the cart",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          refetch()
        });
    } else {
      Swal.fire({
        title: "Please Login?",
        text: "Without an account you can't add products to cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Signup Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signup', {state: {from : location}})
        }
      });
    }
  };

  return (
    <div className="card bg-base-100  shadow-xl relative m-4">
      <div
        className={`absolute right-2 top-2 rating z-10 p-4 bg-blue-400 rounded-tr-3xl rounded-bl-3xl ${
          isFavourite ? "text-rose-600" : "text-white"
        }`}
        onClick={handleFavouriteClick}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <Link>
        <figure className="w-full aspect-square overflow-hidden">
          <img
            // src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            src={image}
            alt="Shoes"
            className="w-full h-full object-cover hover:scale-105 transition-all duration-200"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link>
          <h2 className="card-title">{name}</h2>
        </Link>
        <p>{price}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
