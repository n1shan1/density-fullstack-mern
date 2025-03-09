import React from "react";
import Title from "../components/UI/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/UI/NewsLetterBox";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt="icons"
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-between gap-6 ms:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo enim
            aut sequi voluptatum iure repellendus suscipit, ullam porro harum
            magni! Enim, quaerat accusantium?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            consectetur commodi tempora.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, ut
            repellat! Assumenda, facere atque a cumque id hic ea magni quae.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-xol md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
            nihil provident, tenetur delectus reiciendis cupiditate quod hic
            architecto iste ipsa, natus ullam inventore.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
            nihil provident, tenetur delectus reiciendis cupiditate quod hic
            architecto iste ipsa, natus ullam inventore.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
            nihil provident, tenetur delectus reiciendis cupiditate quod hic
            architecto iste ipsa, natus ullam inventore.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
