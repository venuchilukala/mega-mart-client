import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useAuth();
  // To store cart item along with quantity
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      const productDetails = await Promise.all(
        cart.products.map(async (item) => {
          const res = await axiosPublic.get(`/products/${item.product}`);
          const productData = await res.data;
          return {
            ...productData,
            quantity: item.quantity,
          };
        })
      );
      setCartItems(productDetails);
    };

    if (cart?.products) {
      fetchProductDetails();
    }
  }, [cart]);

  // Calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  // Calculate sub total
  const calculateSubTotal = cartItems.reduce(
    (total, item) => total + calculatePrice(item),
    0
  );

  // calculate handle increase
  const handleIncrease = async (item) => {
    try {
      const updatedQty = {
        productId: item._id,
        quantity: 1,
        email: cart.email,
      };

      const res = await axiosSecure.post(`/carts`, updatedQty);

      if (res.status !== 200) {
        throw new Error("Failed to update quantity");
      }

      // Update the UI with the new cart data
      const updatedCart = cartItems.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCart);
      refetch();
    } catch (error) {
      console.error("Error increasing item quantity:", error);
    }
  };

  const handleDecrease = async (item) => {
    try {
      const updatedQty = {
        productId: item._id,
        quantity: -1,
        email: cart.email,
      };

      const res = await axiosSecure.post(`/carts`, updatedQty);

      if (res.status !== 200) {
        throw new Error("Failed to decrease quantity");
      }

      // Update the UI with the new cart data (decrease quantity)
      const updatedCart = cartItems.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCartItems(updatedCart);

      refetch();
    } catch (error) {
      console.error("Error decreasing item quantity:", error);
    }
  };

  // delete a product
  const handleDelete = (item) => {
   
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(
            `/carts/${item._id}?email=${user?.email}`
          );

          const updatedCart = cartItems.filter(
            (cartItem) => cartItem._id !== item._id
          );
          setCartItems(updatedCart);
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been removed.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting item:", error);
        }
      }
    });
  };

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51QD4UKGRuuZkEResgjt5ed46eJ693m49b96GARlcgJFVESKS2pC1mCVUFuM7TJWSc7KPPumyhl5TWjkHpcruxsyV00USmT3xkr"
      );
      if (!stripe) {
        console.error("Stripe initialization failed");
        return;
      }
      const body = {
        products: cartItems,
      };

      const response = await axiosSecure.post("/create-checkout-session", body);
      if (response.status !== 200) {
        console.error("Failed to create checkout session", response.data);
        return;
      }
      const data = await response.data;
      const session_id = data.id;

      const result = await stripe.redirectToCheckout({ sessionId: session_id });
      if (result.error) {
        console.error("Error redirecting to checkout:", result.error.message);
      } else {
        // Wait for the payment confirmation webhook or status
        const paymentStatus = await waitForPaymentConfirmation(session_id);
        if (paymentStatus === "success") {
          // Clear the cart after successful payment
          const clearCartResponse = await axiosPublic.delete(
            `/carts/clear-cart`
          );

          if (clearCartResponse.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Payment Successful",
              text: "Your cart has been cleared.",
            });
          } else {
            console.error(
              "Failed to clear the cart:",
              await clearCartResponse.data
            );
          }
        } else {
          console.error("Payment not successful, cart not cleared.");
        }
      }
    } catch (error) {
      console.error("Error during payment process:", error);
    }
  };

  return (
    <div className="section-container">
      <div className="min-h-screen xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-8 flex flex-col items-center justify-center gap-8">
          <div className="px-4 space-y-7">
            <h2 className="md:text-4xl font-bold md:leading-snug leading-snug">
              Items in the Cart
            </h2>
          </div>
        </div>
        {cartItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-10">
            <h3 className="text-xl font-bold">No products in cart</h3>
            <p className="mt-3">Your cart is currently empty.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-5 btn btn-primary"
            >
              Go to Home
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-primary text-white">
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={item.image} alt={item.name} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>&#8377; {calculatePrice(item).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-xs"
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        readOnly
                        className="w-10 mx-2 text-center"
                      />
                      <button
                        className="btn btn-xs"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </td>
                    <th>
                      <button
                        className="btn btn-ghost btn-sm text-red-500"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="my-12 flex flex-col md:flex-row justify-between items-start">
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium">Customer Details</h3>
              <p>Name : {user?.displayName || user?.name}</p>
              <p>Email : {user?.email}</p>
              <p>User ID : {user?.uid}</p>
            </div>
            <div>
              <h3 className="font-medium">Shopping Details</h3>
              <p>Total Items : {cartItems?.length || 0}</p>
              <p>Total Price : &#8377; {calculateSubTotal.toFixed(2)}</p>

              <button
                onClick={makePayment}
                className="btn btn-md btn-primary text-white mt-5"
              >
                Proceed Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
