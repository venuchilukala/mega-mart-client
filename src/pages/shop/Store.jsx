import React, { useEffect, useState } from "react";
import StoreCard from "../../components/StoreCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Store = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const getStoresData = async () => {
      try {
        
        const response = await fetch("https://mega-mart-server.onrender.com/stores")
        const data = await response.json()
        setStores(data)
      } catch (error) {
        console.error("Failed to fetch stores data:", error);
        // Optionally, show an alert or display a fallback message
      }
    };

    getStoresData(); // <-- Ensure that the function is called here
  }, []);

  return (
    <div>
      <h1>Store Filter Section</h1>
      {stores.length > 0 ? (
        stores.map((store, index) => <StoreCard key={index} store={store} />)
      ) : (
        <p>No stores available.</p>
      )}
    </div>
  );
};

export default Store;
