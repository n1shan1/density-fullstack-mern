import React from "react";
import Hero from "../components/Home/Hero";
import LatestCollection from "../components/Home/LatestCollection";
import Bestseller from "../components/Home/Bestseller";
import OurPolicy from "../components/Home/OurPolicy";
import NewsLetterBox from "../components/UI/NewsLetterBox";
const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <Bestseller />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  );
};

export default Home;
