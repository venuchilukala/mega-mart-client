import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { useParams } from "react-router-dom";

const StoreItems = () => {
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const { id } = useParams();
  console.log(" stoewaje",store);

  useEffect(() => {
    const fetchStoreAndProducts = async () => {
      try {
        // Fetch the store by its ID
        const storeResponse = await fetch(`https://mega-mart-server.onrender.com/stores/${id}`);
        const storeData = await storeResponse.json();
        setStore(storeData);

        // Fetch all products by their IDs
        const productPromises = storeData.products.map((productId) =>
          fetch(`https://mega-mart-server.onrender.com/products/${productId}`).then((res) =>
            res.json()
          )
        );

        const productsData = await Promise.all(productPromises);
        setProducts(productsData);

        console.log("Store Data:", storeData);
        console.log("Products Data:", productsData);
      } catch (error) {
        console.error("Error fetching store or products:", error);
      }
    };

    fetchStoreAndProducts();
    setCurrentPage(1); // Reset pagination
  }, []);

  //Paginaton Logic is here
  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const currentItems = products.slice(indexOfFirstPage, indexOfLastPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {store && (
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">{store.name}</h1>
          <p className="text-lg text-gray-600">{store.location}</p>
          <p className="text-sm text-gray-500">{store.category}</p>
          <img
            src={store.bannerImage}
            alt={`${store.name} Banner`}
            className="w-full h-64 object-cover my-4 rounded-lg"
          />
        </div>
      )}

      {products && products.length > 0 ? (
        <>
        <h1>Store Items Filter Section</h1>
          {/* Items */}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 w-full">
            {currentItems.map((product, index) => (
              <Cards key={index} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center my-5">
            {Array.from({
              length: Math.ceil(products.length / itemsPerPage),
            }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-3 px-3 py-1 rounded-full bg-gray-300 ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-2xl font-bold flex items-center justify-center">No Products to show</div>
      )}
    </div>
  );
};

export default StoreItems;
