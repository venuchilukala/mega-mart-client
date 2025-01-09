import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { useParams } from "react-router-dom";
import { FaFilter } from "react-icons/fa";

const StoreItems = () => {
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const { id } = useParams();

  const [filteredItems, setFilteredItems] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStoreAndProducts = async () => {
      try {
        // Fetch the store by its ID
        const storeResponse = await fetch(
          `https://mega-mart-server.onrender.com/stores/${id}`
        );
        const storeData = await storeResponse.json();
        setStore(storeData);

        // Fetch all products by their IDs
        const productPromises = storeData.products.map((productId) =>
          fetch(
            `https://mega-mart-server.onrender.com/products/${productId}`
          ).then((res) => res.json())
        );

        const productsData = await Promise.all(productPromises);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching store or products:", error);
      }
    };

    fetchStoreAndProducts();
    setCurrentPage(1); // Reset pagination
  }, []);

  // Filtering Items based on category and search query
  useEffect(() => {
    const filteredBySearch = products.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredItems(filteredBySearch);
    setCurrentPage(1); // Reset to the first page
  }, [searchQuery, products]);

  //Handle search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle Sort
  const handleSort = (Option) => {
    setSortOption(Option);
    const sortedItems = [...filteredItems];

    //logic
    switch (Option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;

      default:
        break;
    }
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  //Paginaton Logic is here
  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstPage, indexOfLastPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {store && (
        <div className="mb-6 text-center">
          <img
            src={store.bannerImage}
            alt={`${store.name} Banner`}
            className="w-full h-64 object-cover my-4 rounded-lg"
          />
          <div className="flex justify-center">
            <label className="input input-bordered flex items-center gap-2 rounded-full">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </div>
      )}

      {products && products.length > 0 ? (
        <>
          <div className="flex flex-col md:flex-row justify-around items-center">
            <div>
              <h1 className="text-3xl font-bold">{store.name}</h1>
              <p className="text-lg text-gray-600">{store.location}</p>
              <p className="text-sm text-gray-500">{store.category}</p>
            </div>
            <div className="flex">
              <div className="p-2 bg-black text-white">
                <FaFilter />
              </div>

              <select
                name="sort"
                id="sort"
                onChange={(event) => handleSort(event.target.value)}
                value={sortOption}
                className="px-2 py-1 rounded-sm bg-black text-white"
              >
                <option value="default">Default</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
            </div>
          </div>
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
        <div className="text-2xl font-bold flex items-center justify-center">
          No Products to show
        </div>
      )}
    </div>
  );
};

export default StoreItems;
