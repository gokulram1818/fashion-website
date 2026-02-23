import productModel from '../models/productModel.js'
import  {v2 as cloudinary} from 'cloudinary'


const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, bestSeller, sizes } = req.body;

    const imageFiles = [
      req.files?.image1?.[0],
      req.files?.image2?.[0],
      req.files?.image3?.[0],
      req.files?.image4?.[0],
    ].filter(Boolean); 

    if (imageFiles.length === 0) {
      return res.json({ success: false, message: "No images uploaded" });
    }

    const imageUrls = [];

    for (const file of imageFiles) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "products" }, 
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(file.buffer)
      })

      imageUrls.push(uploadResult.secure_url);
    }

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestSeller: bestSeller === "true",
      sizes: Array.isArray(sizes) ? sizes : JSON.parse(sizes),
      image: imageUrls, 
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({
      success: true,
      message: "Product Added Successfully",
      product,
    });

  } catch (error) {
    console.log("CLOUDINARY ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

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
        const {productId} = req.body
        await productModel.findByIdAndDelete(productId)
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