import React, { useEffect, useState } from "react";
import StoreCard from "../../components/StoreCard";

const Store = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const getStoresData = async () => {
      const response = await fetch("https://mega-mart-server.onrender.com/stores");
      const data = await response.json();
      console.log(data);
      setStores(data)
    };
    getStoresData()
  },[]);

  return (
    <div>
      <h1>Store Filter Section</h1>
      {
        stores.map((store, index) => (
          <StoreCard key={index} store={store}/>
        ))
      }
    </div>
  );
};

export default Store;
