import React from "react";

const services = [
  {
    id: 1,
    title: "Valet Parking",
    description: "Convenient and secure parking for your vehicle.",
    icon: "🚗",
  },
  {
    id: 2,
    title: "Food Court",
    description: "Satisfy your cravings with a variety of cuisines.",
    icon: "🍔",
  },
  {
    id: 3,
    title: "Kids' Play Area",
    description: "Safe and fun play zones for children.",
    icon: "🎠",
  },
  {
    id: 4,
    title: "Multiplex Cinema",
    description: "Catch the latest blockbusters in style.",
    icon: "🎬",
  },
  {
    id: 5,
    title: "Free Wi-Fi",
    description: "Stay connected while you shop.",
    icon: "📶",
  },
  {
    id: 6,
    title: "ATM Services",
    description: "Hassle-free cash withdrawals and banking.",
    icon: "🏧",
  },
];

const MallServices = () => {
  return (
    <div className="section-container py-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Services at the Mall</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-center">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MallServices;
