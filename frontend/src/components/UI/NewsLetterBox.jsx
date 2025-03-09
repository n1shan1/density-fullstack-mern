import React from "react";

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    //submit the meail to react mail
  };
  return (
    <div className="border-blue-100 text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now and get 20% off!
      </p>
      <p className="text-md mt-3 text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, officia
        nisi in nam saepe nihil.
      </p>
      <form
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
        action=""
      >
        <input
          className="w-full sm:flex-1 outline-none"
          placeholder="Enter you email address..."
          type="email"
          required
        />
        <button
          className="bg-black text-white text-xs px-10 py-4"
          type="submit"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
