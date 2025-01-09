import React from "react";
import { useNavigate } from "react-router-dom";

const categoryItems = [
  {
    id: 1,
    title: "Fashion",
    subTitle: "Step into style and express yourself.",
    image: "/images/home/category/fashion.webp",
    link: "/store",
  },
  {
    id: 2,
    title: "Sports and Leisure",
    subTitle: "Gear up for action and relaxation.",
    image: "/images/home/category/sports.webp",
    link: "/store",
  },
  {
    id: 3,
    title: "Premium",
    subTitle: "Indulge in luxury, redefine your lifestyle.",
    image: "/images/home/category/premium.webp",
    link: "/store",
  },
  {
    id: 4,
    title: "Kids",
    subTitle: "Where fun meets learning and play.",
    image: "/images/home/category/kids.webp",
    link: "/store",
  },
  {
    id: 5,
    title: "Home & Tech",
    subTitle: "Upgrade your home with smart solutions.",
    image: "/images/home/category/home and tech.webp",
    link: "/store",
  },
  {
    id: 6,
    title: "Beauty & Wellness",
    subTitle: "Unveil your glow and inner harmony.",
    image: "/images/home/category/beauty and wellness.webp",
    link: "/store",
  },
  {
    id: 7,
    title: "Jewellery & Watches",
    subTitle: "Timeless elegance for every occasion.",
    image: "/images/home/category/Jewellery and watches.webp",
    link: "/store",
  },
  {
    id: 8,
    title: "Books & Stationary",
    subTitle: "Fuel your creativity and knowledge.",
    image: "/images/home/category/Books and stationary.webp",
    link: "/store",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    navigate(link);
  };

  return (
    <div className="section-container p-4">
      <div>
        <p className="text-5xl font-semibold mx-2 my-4 text-center">Shop by Category</p>
      </div>
      <div className="flex xl:flex-row flex-wrap flex-col justify-center gap-5 ">
        {categoryItems.map((eachCat) => (
          <div
            key={eachCat.id}
            className="relative shadow-xl p-2 cursor-pointer rounded-md overflow-hidden group"
            onClick={() => handleNavigation(eachCat.link)}
          >
            <img
              src={eachCat.image}
              alt={eachCat.title}
              className="w-full h-64 md:w-80 md:h-96 rounded-md transform group-hover:scale-110 transition-transform duration-300 ease-in-out"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center sm:opacity-100 xl:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg font-semibold">
                {eachCat.title}
              </h3>
              <p className="text-white">{eachCat.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
