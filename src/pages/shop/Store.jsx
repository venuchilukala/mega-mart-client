import React, { useEffect, useState } from "react";
import StoreCard from "../../components/StoreCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Store = () => {
  const [stores, setStores] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const getStoresData = async () => {
      try {
        const response = await axiosSecure(
          "https://mega-mart-server.onrender.com/stores"
        );
        console.log("Stores fetched successfully:", response.data);
        setStores(response.data);
      } catch (error) {
        console.error("Failed to fetch stores data:", error);
        // Optionally, show an alert or display a fallback message
      }
    };
  }, []);

  return (
    <div>
      <h1>Store Filter Section</h1>
      {stores.map((store, index) => (
        <StoreCard key={index} store={store} />
      ))}
    </div>
  );
};

export default Store;
