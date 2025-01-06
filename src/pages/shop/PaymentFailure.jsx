import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentFailure = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming user information is stored here
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const handleFailure = async () => {
      if (user?.email) {
        try {
          // Step 1: Get the cart using the user's email
          const cartResponse = await axiosSecure.get(`/carts?email=${user.email}`);

          // Check if the response was successful
          if (cartResponse.status === 200 && cartResponse.data) {
            const cartData = cartResponse.data;

            if (cartData && cartData._id) {
              // Step 2: Send the cart ID to clear the cart (optional if you want to reset cart on failure)
              const deleteResponse = await axiosSecure.delete(`/carts/clear-cart/${cartData._id}`);

              if (deleteResponse.status === 200) {
                Swal.fire({
                  icon: "error",
                  title: "Payment Failed",
                  text: "Something went wrong. Please try again later.",
                  timer: 3000,
                });
                navigate("/retry-payment"); // Redirect to retry the payment process
              } else {
                console.error("Failed to clear cart:", deleteResponse.data);
              }
            } else {
              console.error("Cart not found.");
            }
          } else {
            console.error("Failed to fetch cart:", cartResponse.data);
          }
        } catch (error) {
          console.error("Error handling payment failure:", error);
        }
      }
    };

    handleFailure();
  }, [user, navigate, axiosSecure]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1>Payment Failed</h1>
      <p>There was an issue processing your payment. Please try again later.</p>
      <button 
        onClick={() => navigate("/cart-page")} 
        className="mt-4 p-2 bg-red-500 text-white rounded"
      >
        Retry Payment
      </button>
    </div>
  );
};

export default PaymentFailure;
