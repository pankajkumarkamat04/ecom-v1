import productModel from "../models/productSchema.js";
import errorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import APIFilter from "../utils/APIFilters.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";

const getProduct = catchAsyncError(async (req, res, next) => {
  const resPerPage = 4;
  let apifilter = new APIFilter(productModel, req.query).search().filters();
  let products = await apifilter.query;
  const ProductCount = products.length;
  apifilter.pagination(resPerPage);
  products = await apifilter.query.clone();
  res.send({ ProductCount, resPerPage, products }).status(200);
});

const addProduct = catchAsyncError(async (req, res) => {
  req.body.user = req.user._id;
  let data = req.body;
  const result = await productModel.create(data);
  res.json({ result }).status(200);
});

const getProductDetail = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const result = await productModel.findById(id);
  if (!result) {
    return next(new errorHandler("Product Not Found", 404));
  }
  res.json({ result }).status(200);
});
const updateProduct = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const id = req.params.id;
  const result = await productModel.findByIdAndUpdate(id, data, { new: true });
  if (!result) {
    return next(new errorHandler("Product Not Found", 404));
  }
  res.json({ result }).status(200);
});

const deleteProduct = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;

  const product = await productModel.findByIdAndDelete(id);
  console.log(product);
  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }

  product.images.map(async (img) => {
    await delete_file(img.public_id);
  });

  res.json({ message: true }).status(200);
});

const getAllProduct = catchAsyncError(async (req, res, next) => {
  const product = await productModel.find();
  res.status(200).json({
    product,
  });
});

const uploadProductImage = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const { images } = req.body;
  const product = await productModel.findById(id);
  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }

  const uploader = async (img) => await upload_file(img, "/ecom/product");

  const url = await Promise.all(images.map(uploader));
  product.images.push(...url);
  await product.save();
  res.status(200).json({
    message: true,
  });
});

const deleteProductImage = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { imgId } = req.body;
  console.log(imgId);
  const product = await productModel.findById(id);

  if (!product) {
    next(new errorHandler("Product Not Found", 404));
  }

  const result = await delete_file(imgId);

  if (result) {
    product.images = product?.images.filter((img) => img.public_id != imgId);
  }
  product.save();

  res.status(200).json({
    message: true,
  });
});
export {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  getAllProduct,
  uploadProductImage,
  deleteProductImage,
};
