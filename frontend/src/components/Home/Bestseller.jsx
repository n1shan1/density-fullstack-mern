import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "../UI/Title";
import ProductItem from "../UI/ProductItem";

const Bestseller = ({}) => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestseller);
    setBestSeller(bestProducts.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          molestias reprehenderit minima alias iusto quod blanditiis? Culpa
          accusamus, reiciendis impedit eaque quidem atque eos pariatur. Nobis
          accusamus sit eaque impedit cumque expedita!
        </p>
      </div>

      {/* best seller grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {bestSeller.map((product, index) => (
          <ProductItem
            key={index}
            image={product.image}
            productId={product._id}
            price={product.price}
            name={product.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Bestseller;
