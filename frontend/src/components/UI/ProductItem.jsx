import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { Link } from "react-router-dom";
const ProductItem = ({ productId, name, image, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="text-gray-500 cursor-pointer" to={`/product/${productId}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out duration-500"
          src={image[0]}
          alt="image"
        />
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
