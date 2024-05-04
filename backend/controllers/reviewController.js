import catchAsyncError from "../middleware/catchAsyncError.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productSchema.js";
import reviewModel from "../models/reviewModel.js";

const canReview = catchAsyncError(async (req, res, next) => {
  const id = req?.params.id;
  const user = req?.user._id;
  const result = await orderModel.find({ user, "orderItems.product": id });

  if (result.length == 0) {
    return res.status(200).json({
      canReview: false,
    });
  }
  res.status(200).json({
    canReview: true,
  });
});
const createReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, product } = req.body;
  const user = req.user._id;

  const isUserReviewed = await reviewModel.findOne({ user, product });
  if (isUserReviewed) {
    isUserReviewed.rating = rating;
    isUserReviewed.comment = comment;

    isUserReviewed.save();
  } else {
    const result = await reviewModel.create({
      rating,
      comment,
      product,
      user,
    });
  }

  const numOfReviews = await reviewModel.find({ product });
  const ratings =
    numOfReviews.length === 0
      ? 0
      : numOfReviews.reduce((acc, item) => {
          return acc + item.rating;
        }, 0) / numOfReviews.length;
  console.log(ratings);
  const newRating = await productModel.findByIdAndUpdate(product, {
    numOfReviews: numOfReviews.length,
    rating: ratings,
  });
  res.status(200).json({
    success: true,
  });
});

const getReview = catchAsyncError(async (req, res, next) => {
  const product = req.params.id;
  const result = await reviewModel
    .find({ product })
    .populate("user", "name avatar");

  if (!result) {
    return next("This Product Has No Review", 404);
  }

  res.status(200).json({
    result,
  });
});

const deleteReview = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const result = await reviewModel.findByIdAndDelete(id);

  if (!result) {
    return next("Review Doesn't Exist", 404);
  }
  const product = await productModel.find({ _id: result.product });
  const numOfReviews = await reviewModel.find({ product: result.product });
  const ratings =
    numOfReviews.length === 0
      ? 0
      : numOfReviews.reduce((acc, item) => {
          return acc + item.rating;
        }, 0) / numOfReviews.length;
  await productModel.findByIdAndUpdate(product, {
    numOfReviews: numOfReviews.length,
    rating: ratings,
  });

  res.status(200).json({
    success: true,
  });
});

export { createReview, getReview, deleteReview, canReview };
