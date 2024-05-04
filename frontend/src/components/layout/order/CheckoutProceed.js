import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useCreateOrderMutation,
  useStripeCheckoutSessionMutation,
} from "../../../store/api/orderApi";
import TotalAmountCaculator from "../../../helpers/TotalAmountCaculator";
import toast from "react-hot-toast";
import { setShippingInfo } from "../../../store/slice/cartSlice";

const CheckoutProceed = ({ shippingInfo }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading, isSuccess, isError, error }] =
    useCreateOrderMutation();

  const [
    stripeCheckoutSession,
    {
      isSuccess: stripeIsSuccess,
      isLoading: stripeIsLoading,
      data: stripeData,
      error: stripeError,
    },
  ] = useStripeCheckoutSessionMutation();
  const { cartItems } = useSelector((state) => state.cart);
  const { itemsPrice, taxAmount, shippingAmount, totalAmount } =
    TotalAmountCaculator(cartItems);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Order Placed Successfully");
      navigate("/order?success=ture");
    }
  }, [isSuccess, error]);
  useEffect(() => {
    if (stripeError) {
      toast.error(stripeError?.data?.message);
    }
    if (stripeIsSuccess) {
      window.location.href = stripeData.session.url;
    }
  }, [stripeIsSuccess, stripeError]);
  const order_handler = () => {
    if (shippingInfo.name === "") {
      toast.error("Name is requried");
      return;
    } else if (shippingInfo.phone_no === "") {
      toast.error("Phone No is requried");
      return;
    } else if (shippingInfo.email === "") {
      toast.error("Email is requried");
      return;
    } else if (shippingInfo.address === "") {
      toast.error("Address is requried");
      return;
    } else if (shippingInfo.city === "") {
      toast.error("City is requried");
      return;
    } else if (shippingInfo.state === "") {
      toast.error("State is requried");
      return;
    } else if (shippingInfo.country === "") {
      toast.error("Country is requried");
      return;
    } else if (shippingInfo.pinCode === "") {
      toast.error("Pin Code is requried");
      return;
    }
    const orderDetail = {
      shippingInfo,
      orderItems: cartItems,
      paymentMethod: "COD",
      paymentInfo: {
        status: "Not Paid",
      },
      itemsPrice,
      shippingAmount,
      taxAmount,
      totalAmount,
    };
    dispatch(setShippingInfo(shippingInfo));

    if (paymentMethod === "cod") {
      createOrder({ orderDetail });
    }
    if (paymentMethod === "stripe") {
      stripeCheckoutSession({ orderDetail });
    }
  };

  return (
    <div>
      <div className="d-flex flex-column bg-body-secondary p-3 rounded-2 border border-light">
        <div>
          <p className="d-block">
            Total Product : <b>{cartItems.length}</b>
          </p>
          <p className="d-block">
            Subtotal : <b>{Number(itemsPrice).toFixed(2)}</b>
          </p>
          <p className="d-block">
            Tax Amount : <b>{Number(taxAmount).toFixed(2)}</b>
          </p>
          <p className="d-block">
            Shipping Amount : <b>{Number(shippingAmount).toFixed(2)}</b>
          </p>
          <p className="d-block">
            Total Amount : <b>{Number(totalAmount).toFixed(2)}</b>
          </p>
        </div>
        <hr></hr>
        <div>
          <form action="">
            <div className="d-flex">
              <div className="cod-md-3 me-3">
                <input
                  type="radio"
                  className="form-check-input me-1"
                  name="method"
                  id="cod"
                  onClick={(e) => setPaymentMethod("cod")}
                />
                <label htmlFor="cod" className="form-label">
                  COD
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="form-check-input me-1"
                  name="method"
                  id="onilne-payment"
                  onClick={(e) => setPaymentMethod("stripe")}
                />
                <label htmlFor="onilne-payment" className="form-label">
                  Stripe
                </label>
              </div>
            </div>
          </form>
          <button
            className="btn btn-success"
            onClick={order_handler}
            disabled={stripeIsLoading}
          >
            Procced To Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProceed;
