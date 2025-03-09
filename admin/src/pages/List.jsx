import { React, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL, currency } from "../App";
import { toast } from "react-toastify";
const List = ({ token }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/products/list`);
      if (response.data.success) {
        setProducts(response.data.product);
        console.log(response);
        // toast.success("Products fetched successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Server Error: ", error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/products/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Product Deleted successfully!");
        fetchProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Server Error: ", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <p className="mb-2">All products List</p>
      <div className="flex flex-col gap-2">
        {/* list table */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-200 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* product list */}
        {products.map((product, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <img className="w-12" src={product.image[0]} alt="image" />
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>
              {currency}
              {product.price}
            </p>
            <p
              onClick={() => removeProduct(product._id)}
              className="text-right md:text-center cursor-pointer text-sm bg-slate-200 rounded-lg py-2 px-3 text-red-600"
            >
              {"DELETE"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
