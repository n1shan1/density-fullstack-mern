import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";
//Function to add a product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesURL = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      image: imagesURL,
      date: Date.now(),
    };

    console.log(productData);

    const product = new Product(productData);
    await product.save();

    res.json({
      success: true,
      message: "[productController/addProduct]: Product added successfully",
      op: product,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `[productController/addProduct]: ${error.message}`,
    });
  }
};
//Function to list all the products
const listProducts = async (req, res) => {
  try {
    const product = await Product.find({});
    res.json({
      success: true,
      message: "[productController/listProducts]: Products listed successfully",
      product,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `[productController/listProducts]: ${error.message}`,
    });
  }
};
// Function to remove a product by id
const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message:
        "[productController/removeProduct]: Product removed successfully",
      product,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `[productController/removeProduct]: ${error.message}`,
    });
  }
};
//Function to get a product by id
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (product) {
      return res.json({
        success: true,
        message:
          "[productController/singleProduct]: Product found successfully",
        product,
      });
    } else {
      return res.json({
        success: false,
        message: "[productController/singleProduct]: Product not found",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: `[productController/singleProduct]: ${error.message}`,
    });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };
