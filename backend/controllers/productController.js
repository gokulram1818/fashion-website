import productModel from '../models/productModel.js'
import {v2 as cloudinary} from 'cloudinary'


const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, bestSeller, sizes } = req.body;

    const images = [];

    if (req.files?.image1) images.push(req.files.image1[0].path);
    if (req.files?.image2) images.push(req.files.image2[0].path);
    if (req.files?.image3) images.push(req.files.image3[0].path);
    if (req.files?.image4) images.push(req.files.image4[0].path);

    if (images.length === 0) {
      return res.json({ success: false, message: "No images uploaded" });
    }

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestSeller: bestSeller === "true",
      sizes: sizes ? JSON.parse(sizes) : [], 
      image: images,
      date: Date.now()
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added Successfully" });

  } catch (error) {
    console.log("ADD PRODUCT ERROR:", error)
    res.status(500).json({ success: false, message: error.message });
  }
}

const listProduct = async (req, res) => {
    try{
    const products = await productModel.find({})
    res.json({success: true, products})
    }catch(error){
        res.json({success : false, message : error.message})
    }
}

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "product removed"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const singleProduct = async (req, res) => {

    try {
        const {productId} =req.params
        const product = await productModel.findById(productId)
        res.json({success : true, product})
    } catch (error) {
        res.json({success : false, message: error.message})
    }
    
}


export {addProduct, listProduct, removeProduct, singleProduct}