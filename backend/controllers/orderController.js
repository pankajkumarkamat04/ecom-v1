import catchAsyncError from "../middleware/catchAsyncError.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productSchema.js";
import errorHandler from "../utils/errorHandler.js";

const createOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    paymentInfo,
    itemsPrice,
    shippingAmount,
    taxAmount,
    totalAmount,
    orderStatus,
  } = req.body;
  const user = req.user._id;
  const order = await orderModel.create({
    shippingInfo,
    orderItems,
    paymentMethod,
    paymentInfo,
    itemsPrice,
    shippingAmount,
    taxAmount,
    totalAmount,
    orderStatus,
    user,
  });

  order.save();

  res.status(200).json({
    order,
  });
});

const getAllOrder = catchAsyncError(async (req, res, next) => {
  const user = req.user._id;

  const order = await orderModel.find({ user });

  if (!order) {
    return next(new errorHandler("You Don't Have Any Order", 200));
  }
  res.status(200).json({
    order,
  });
});

const getOrder = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;

  const order = await orderModel.findById(id);
  if (!order) {
    return next(new errorHandler("Order Didn't Find With This Id", 404));
  }
  res.status(200).json({
    order,
  });
});

const getAllUsersOrder = catchAsyncError(async (req, res, next) => {
  const orders = await orderModel.find();

  res.status(200).json({
    orders,
  });
});

const updateOrder = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const { orderStatus } = req.body;

  const order = await orderModel.findById(id);

  if (order.orderStatus === "Delivered") {
    return next(new errorHandler("Order Already Delivered", 200));
  }

  if (orderStatus === "Delivered") {
    order.orderItems.forEach(async (item) => {
      const product = await productModel.findById(item.product.toString());

      if (!product) {
        return next(new errorHandler("Product Didn't Found By This Id", 404));
      }
      const newstock = await product.stock - item.quantity;
      product.stock = newstock;
      console.log(newstock);
      product.save({ validateBeforeSave: false });
    });

    order.orderStatus = orderStatus;
    order.save();
  } else {
    order.orderStatus = orderStatus;
    order.save();
  }

  res.status(200).json({
    success: true,
  });
});

const deleteOrder = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const order = await orderModel.findByIdAndDelete(id);

  if (!order) {
    return next(new errorHandler("Order Not Found", 404));
  }

  res.status(200).json({
    success: true,
  });
});

async function getSalesData(startdate, enddate) {
  const salesData = await orderModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(startdate),
          $lte: new Date(enddate),
        },
      },
    },

    {
      $group: {
        _id: {
          date: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
        },
        totalSales: { $sum: "$totalAmount" },
        numOfOrder: { $sum: 1 },
      },
    },
  ]);

  let numOfOrder = 0;
  let totalSales = 0;
  const Salesmap = new Map();
  salesData.forEach((entry) => {
    const date = entry?._id.date;
    const sales = entry?.totalSales;
    const orders = entry?.numOfOrder;

    Salesmap.set(date, { sales, orders });
    numOfOrder += orders;
    totalSales += sales;
  });

  const DateBetween = await getDateBetween(startdate, enddate);
  const finalSalesData = DateBetween.map((date) => ({
    date,
    sales: (Salesmap.get(date) || { sales: 0 }).sales,
    orders: (Salesmap.get(date) || { orders: 0 }).orders,
  }));
  return { totalSales, numOfOrder, finalSalesData };
}

async function getDateBetween(startdate, enddate) {
  const dates = [];
  let currentdate = new Date(startdate);

  while (currentdate <= new Date(enddate)) {
    const formatedDate = new Date(currentdate).toISOString().split("T");
    dates.push(formatedDate[0]);
    currentdate.setDate(currentdate.getDate() + 1);
  }
  return dates;
}

const getSales = catchAsyncError(async (req, res, next) => {
  let { startdate, enddate } = req.query;
  startdate = new Date(startdate);
  enddate = new Date(enddate);

  startdate.setHours(0, 0, 0, 0);
  enddate.setHours(23, 59, 59, 999);
  const { totalSales, numOfOrder, finalSalesData } = await getSalesData(
    startdate,
    enddate
  );

  res.status(200).json({
    salesData: finalSalesData,
    totalSales,
    numOfOrder,
  });
});

export {
  createOrder,
  getOrder,
  getAllOrder,
  getAllUsersOrder,
  updateOrder,
  deleteOrder,
  getSales,
};
