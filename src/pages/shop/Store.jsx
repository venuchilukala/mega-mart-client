import React, { useEffect, useState } from "react";
import StoreCard from "../../components/StoreCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Store = () => {
  const [stores, setStores] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");

  const axiosPublic = useAxiosPublic()

  // Get all Stores
  useEffect(() => {
    const getStoresData = async () => {
      try {
        const response = await axiosPublic("/stores");
        const data = await response.data;
        setStores(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Failed to fetch stores data:", error);
        // Optionally, show an alert or display a fallback message
      }
    };

    getStoresData(); // <-- Ensure that the function is called here
  }, []);

  // Filtering Items based on sort and search query
  useEffect(() => {
    const filteredByCategory =
      selectedCategory === "all"
        ? stores
        : stores.filter((item) => item.category === selectedCategory);

    const filteredBySearch = filteredByCategory.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredItems(filteredBySearch);
    setCurrentPage(1); // Reset to the first page
  }, [selectedCategory, searchQuery, stores]);

  //Handle search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtering Items based on category
  const filterItems = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  //   Show all items
  const showAll = () => {
    setFilteredItems(stores);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  //   sorting bases on dropdown value
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

      default:
        break;
    }
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  //Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className=" md:py-8 flex flex-col  justify-center items-center gap-8">
          {/* Search bar */}
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

          {/* text */}
          <div className="text-center space-y-8 px-2 ">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Find it all, all in one place
            </h2>
            <p className="text-xl text-[#4A4A4A] w-4/5 mx-auto">
              Explore stores that bring your favorite brands and hidden gems
              under one roof
            </p>
            <Link to="/cart-page">
              <button className="btn rounded-full bg-blue-600 text-white  font-semibold my-4 px-8">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Store Filters */}
      <div className="flex flex-col md:flex-row justify-between m-5">
        <div className="flex justify-start md:items-center md:gap-8 gap-4 flex-wrap">
          <button
            onClick={showAll}
            className={selectedCategory === "all" ? "active" : ""}
          >
            All
          </button>
          <button
            onClick={() => filterItems("fashion")}
            className={selectedCategory === "fashion" ? "active" : ""}
          >
            Fashion
          </button>
          <button
            onClick={() => filterItems("electronic")}
            className={selectedCategory === "electronic" ? "active" : ""}
          >
            Electronics
          </button>
          <button
            onClick={() => filterItems("food")}
            className={selectedCategory === "food" ? "active" : ""}
          >
            Food
          </button>
          <button
            onClick={() => filterItems("beauty")}
            className={selectedCategory === "beauty" ? "active" : ""}
          >
            Beauty & Wellness
          </button>
          <button
            onClick={() => filterItems("footwear")}
            className={selectedCategory === "footwear" ? "active" : ""}
          >
            Footwear
          </button>
          <button
            onClick={() => filterItems("home")}
            className={selectedCategory === "home" ? "active" : ""}
          >
            Home & Decors
          </button>
          <button
            onClick={() => filterItems("grocery")}
            className={selectedCategory === "grocery" ? "active" : ""}
          >
            Grocery
          </button>
          <button
            onClick={() => filterItems("sports")}
            className={selectedCategory === "sports" ? "active" : ""}
          >
            Sports
          </button>
          <button
            onClick={() => filterItems("entertainment")}
            className={selectedCategory === "entertainment" ? "active" : ""}
          >
            Entertainment
          </button>
        </div>

        {/* Sorting */}
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

      {/* Stores */}
      <div>
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {currentItems.map((store, index) => (
              <StoreCard key={index} store={store} />
            ))}
          </div>
        ) : (
          <p>No stores available.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-3 px-3 py-1 rounded-full ${
              currentPage === index + 1
                ? "bg-blue-400 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Store;

/*
 const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  // Loading data
  useEffect(() => {
    //Fetchind data from backend
    const fetchedData = async () => {
      try {
        const response = await fetch("http://localhost:6001/menu");
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("Error : ", error);
      }
    };

    // calling function
    fetchedData();
  }, []);

  // Filtering Items based on category and search query
  useEffect(() => {
    const filteredByCategory =
      selectedCategory === "all"
        ? menu
        : menu.filter((item) => item.category === selectedCategory);

    const filteredBySearch = filteredByCategory.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredItems(filteredBySearch);
    setCurrentPage(1); // Reset to the first page
  }, [selectedCategory, searchQuery, menu]);

  //Handle search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtering Items based on category
  const filterItems = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  //   Show all items
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  //   sorting bases on dropdown value
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

  //Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

*/
