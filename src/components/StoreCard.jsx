import React from "react";

const StoreCard = (props) => {
  const { store } = props;
  const {_id, name, location, category, products, bannerImage, iconImage, floor, contact, createdAt} = store
  
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl xl:mx-16 xl:my-8 m-4">
      <figure>
        <img
          // src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
          src={iconImage} className="w-96"
          alt="Album"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="flex-grow-0">{category}</p>
        <p className="flex-grow-0">{location}</p>
        <p className="flex-grow-0">
          <span className="text-lg font-medium">Floor : {floor}</span> Contact :{" "}
          {contact}
        </p>

        <div className="card-actions justify-end">
          <a href={`/store/${_id}`}>
            <button className="btn btn-primary">View</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
