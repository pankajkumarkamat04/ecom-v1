import React, { useEffect, useState } from "react";
import CheckoutFields from "../../components/layout/order/CheckoutFields";
import { useSelector } from "react-redux";
import CheckoutItems from "../../components/layout/order/CheckoutItems";
import CheckoutProceed from "../../components/layout/order/CheckoutProceed";

const CheckOut = () => {
  const { shippingInfo: localShippingInfo, cartItems } = useSelector(
    (state) => state.cart
  );

  const [shippingInfo, setShippingInfo] = useState({
    name: localShippingInfo ? localShippingInfo.name : "",
    phone_no: localShippingInfo ? localShippingInfo.phone_no : "",
    email: localShippingInfo ? localShippingInfo.email : "",
    address: localShippingInfo ? localShippingInfo.address : "",
    city: localShippingInfo ? localShippingInfo.city : "",
    state: localShippingInfo ? localShippingInfo.state : "",
    country: localShippingInfo ? localShippingInfo.country : "",
    pinCode: localShippingInfo ? localShippingInfo.pinCode : "",
    landmark: localShippingInfo ? localShippingInfo.landmark : "",
    note: "",
  });
  if (cartItems.length == 0) {
    return (
      <>
        <div>
          <h2 className="text-center pt-3 pb-3">Your Cart Have 0 Item</h2>
        </div>
      </>
    );
  }
  return (
    <div>
      <div className="container">
        <h2 className="text-center pt-2 pb-2">Checkout</h2>
        <div className="row">
          <div className="col-md-9">
            <CheckoutFields
              shippingInfo={shippingInfo}
              setShippingInfo={setShippingInfo}
            />
          </div>
          <div className="col-md-3">
            <CheckoutItems />
            <CheckoutProceed shippingInfo={shippingInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
