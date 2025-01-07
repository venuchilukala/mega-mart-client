import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming user information is stored here
  const axiosSecure = useAxiosSecure();
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Get session_id from URL query params
    const params = new URLSearchParams(window.location.search);
    const sessionIdFromUrl = params.get("session_id");
    if (sessionIdFromUrl) {
      setSessionId(sessionIdFromUrl); // Store session ID
    }

    if (sessionIdFromUrl) {
      const clearCart = async () => {
        if (user?.email) {
          try {
            // Step 1: Get the cart using the user's email
            const cartResponse = await axiosSecure.get(
              `/carts?email=${user.email}`
            );

            // Check if the response was successful
            if (cartResponse.status === 200 && cartResponse.data) {
              const cartData = cartResponse.data;

              if (cartData && cartData._id) {
                // Step 2: Send the cart ID to clear the cart
                const deleteResponse = await axiosSecure.delete(
                  `/carts/clear-cart/${cartData._id}`
                );

                if (deleteResponse.status === 200) {
                  console.log("Payment Successful, Cart Cleared");
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
            console.error("Error clearing cart:", error);
          }
        }
      };

      clearCart();
    }
  }, [user, sessionId, navigate, axiosSecure]);

  // Button click handler to navigate to the home page
  const handleNavigateToHome = () => {
    navigate("/"); // Redirect to home or another page
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-semibold text-green-600 mb-4">
          Thank you for your purchase!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Your payment was successful. We are processing your order.
        </p>

        {sessionId && (
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <p className="text-md text-gray-600">Session ID: </p>
            <p className="font-semibold text-gray-800 break-words text-sm sm:text-base lg:text-lg">{sessionId}</p>
          </div>
        )}

        <button
          onClick={handleNavigateToHome}
          className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

// return (
//   <div className="w-full min-h-screen flex flex-col justify-center items-center">
//     <h1>Thank you for your purchase!</h1>
//     <p>Your payment was successful.</p>
//     {sessionId && <p>Session ID: {sessionId}</p>}

//     {/* Button to navigate to home */}
//     <button
//       onClick={handleNavigateToHome}
//       className="btn btn-primary mt-4"
//     >
//       Go to Home
//     </button>
//   </div>
// );
// };

export default PaymentSuccess;
