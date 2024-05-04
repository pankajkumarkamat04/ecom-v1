import catchAsyncError from "../middleware/catchAsyncError.js";
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
export const stripeCheckoutSession = catchAsyncError(async (req, res, next) => {
  const body = req.body;
  const shippingRate = await stripe.shippingRates.create({
    display_name: "Express shipping",
    type: "fixed_amount",
    fixed_amount: {
      amount: body.itemsPrice > 200 ? 0 : 599,
      currency: "usd",
    },
  });
  const taxRates = await stripe.taxRates.create({
    display_name: "GST",
    description: "GST India",
    percentage: 12,
    jurisdiction: "IN",
    inclusive: false,
  });
  const line_items = await body.orderItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item?.name,
          images: [item.image.url],
          metadata: { productId: item?.product },
        },
        unit_amount: item?.price * 100,
      },
      tax_rates: [taxRates.id],
      quantity: item?.quantity,
    };
  });
  console.log(line_items);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${process.env.FRONTEND_URL}/order/?success=true`,
    cancel_url: `${process.env.FRONTEND_URL}/checkout`,
    customer_email: body?.shippingInfo?.email,
    client_reference_id: req?.user?._id.toString(),
    metadata: {
      ...body.shippingInfo,
      itemsPrice: body.itemsPrice,
    },
    shipping_options: [
      {
        shipping_rate: shippingRate.id,
      },
    ],
    line_items,
    mode: "payment",
  });
  res.status(200).json({
    session,
  });
});

const getOrderItems = async (lineItems) => {
  return new Promise((resolve, reject) => {
    const items = [];
    lineItems.data.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;
      items.push({
        name: product.name,
        price: item.price.unit_amount / 100,
        image: product.images[0],
        quantity: item.quantity,
        product: productId,
      });
      if (lineItems.data.length === items.length) {
        resolve(items);
      }
    });
  });
};
export const stipeWebhook = catchAsyncError(async (req, res, next) => {
  try {
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const orderItems = await getOrderItems(lineItems);
      const shippingInfo = {
        name: session.metadata.name,
        phone_no: session.metadata.phone_no,
        email: session.metadata.email,
        address: session.metadata.address,
        city: session.metadata.city,
        state: session.metadata.state,
        country: session.metadata.country,
        pinCode: session.metadata.pinCode,
        landmark: session.metadata.landmark,
        note: session.metadata.note,
      };

      const user = session.client_reference_id;
      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };
      const shippingAmount = session.total_details.amount_shipping / 100;
      const taxAmount = session.total_details.amount_tax / 100;
      const itemsPrice = session.amount_subtotal / 100;
      const totalAmount = session.amount_total / 100;
      const OrderData = {
        shippingInfo,
        user,
        orderItems,
        paymentMethod: "Stripe",
        paymentInfo,
        shippingAmount,
        taxAmount,
        itemsPrice,
        totalAmount,
      };
      console.log(orderItems);

      const order = await orderModel.create(OrderData);
      order.save();
    }
  } catch (error) {
    console.log(error);
  }
});
