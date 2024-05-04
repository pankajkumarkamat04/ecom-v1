import React, { useState } from "react";

const CheckoutFields = ({ shippingInfo, setShippingInfo }) => {
  const chnage_handler = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form>
        <div className="d-flex justify-content-xl-between">
          <div className="col-md-6 pe-3">
            <label htmlFor="name" className="form-label">
              Name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={shippingInfo?.name}
              onChange={chnage_handler}
            />
          </div>
          <div className="col-md-6 ps-3">
            <label htmlFor="phone_no" className="form-label">
              Phone No<span className="text-danger">*</span>
            </label>
            <input
              type="number"
              name="phone_no"
              className="form-control"
              value={shippingInfo?.phone_no}
              onChange={chnage_handler}
            />
          </div>
        </div>
        <div className="d-flex justify-content-xl-between">
          <div className="col-md-6 pe-3">
            <label htmlFor="email" className="form-label">
              Email<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={shippingInfo?.email}
              onChange={chnage_handler}
            />
          </div>
          <div className="col-md-6 ps-3">
            <label htmlFor="address" className="form-label">
              Address<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={shippingInfo?.address}
              onChange={chnage_handler}
            />
          </div>
        </div>
        <div className="d-flex justify-content-xl-between">
          <div className="col-md-6 pe-3">
            <label htmlFor="city" className="form-label">
              City<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="city"
              className="form-control"
              value={shippingInfo?.city}
              onChange={chnage_handler}
            />
          </div>
          <div className="col-md-6 ps-3">
            <label htmlFor="state" className="form-label">
              State<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="state"
              className="form-control"
              value={shippingInfo?.state}
              onChange={chnage_handler}
            />
          </div>
        </div>
        <div className="d-flex justify-content-xl-between">
          <div className="col-md-6 pe-3">
            <label htmlFor="country" className="form-label">
              Country<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="country"
              className="form-control"
              value={shippingInfo?.country}
              onChange={chnage_handler}
            />
          </div>
          <div className="col-md-6 ps-3">
            <label htmlFor="pinCode" className="form-label">
              Pin Code<span className="text-danger">*</span>
            </label>
            <input
              type="number"
              name="pinCode"
              className="form-control"
              value={shippingInfo?.pinCode}
              onChange={chnage_handler}
            />
          </div>
        </div>
        <div className="d-flex justify-content-xl-between">
          <div className="col-md-6 pe-3">
            <label htmlFor="landmark" className="form-label">
              Landmark
            </label>
            <input
              type="text"
              name="landmark"
              className="form-control"
              value={shippingInfo?.landmark}
              onChange={chnage_handler}
            />
          </div>
          <div className="col-md-6 ps-3">
            <label htmlFor="note" className="form-label">
              Note
            </label>
            <input
              type="text"
              name="note"
              className="form-control"
              value={shippingInfo?.note}
              onChange={chnage_handler}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutFields;
