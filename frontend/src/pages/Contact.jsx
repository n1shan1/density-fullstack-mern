import React from "react";
import Title from "../components/UI/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/UI/NewsLetterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          alt="icon"
          className="w-full md:max-w-[480px]"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            Some random address goes here depending <br /> upon where you live
            and what you do?
          </p>
          <p className="text-gray-500">
            Tel: (123) 555-3434 <br /> Email: admin@density.com
          </p>
          <p className="font-semibold text-xl text-gray-700">
            Careers at Density
          </p>
          <button className="border border-black hover:bg-black hover:text-white hover:cursor-pointer transition-all px-8 py-2">
            Explore More
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
