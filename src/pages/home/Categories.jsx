import React from "react";

const categoryItems = [
  {
    id: 1,
    title: "Shop",
    subTitle: "Shop the best, forget the rest.",
    image: "/images/home/e.webp",
  },
  {
    id: 2,
    title: "Dine",
    subTitle: "Where cravings meet satisfaction.",
    image: "/images/home/e.webp",
  },
  {
    id: 3,
    title: "Electronics",
    subTitle: "Find the latest gadgets and accessories.",
    image: "/images/home/e.webp",
  },
  {
    id: 4,
    title: "Entertain",
    subTitle: "Escape into entertainment.",
    image: "/images/home/e.webp",
  },
];

const Categories = () => {
  return (
    <div className="section-container p-4">
      <div>
        <p className="text-xl font-semibold">Categories</p>
      </div>
      <div className="flex xl:flex-row flex-col justify-center gap-5 ">
        {categoryItems.map((eachCat) => (
          <div key={eachCat.id} className="relative shadow-xl p-2 cursor-pointer rounded-md overflow-hidden group">
            <img
              src={eachCat.image}
              alt="Electronics"
              className="w-full h-64 md:w-80 md:h-96 rounded-md transform group-hover:scale-110 transition-transform duration-300 ease-in-out"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center sm:opacity-100 xl:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white text-lg font-semibold uppercase">
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
