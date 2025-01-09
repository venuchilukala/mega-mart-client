import React from "react";
import Banner from "../../components/Banner";
import Categories from "./Categories";
import Toppicks from "./Toppicks";
import Announcement from "./Announcement";
import MallServices from "./MallServices";

const Home = () => {
  const announcement = true;
  return (
    <div>
      {announcement ? <Announcement /> : " "}
      <Banner />
      <Categories />
      <Toppicks />
      <MallServices/>
    </div>
  );
};

export default Home;
