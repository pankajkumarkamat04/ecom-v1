import React from "react";
import { useGetOrderDetailsQuery } from "../../store/api/orderApi";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/layout/Loader";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetOrderDetailsQuery(id);
  const totalAmount =
    data?.order.itemsPrice + data?.order.taxAmount + data?.order.shippingAmount;
  return (
    <>
    {isLoading ? (<Loader />) : (<div className="container">
      <div className="d-flex justify-content-between">
        <h2 className="text-center">Order Details</h2>
        <button
          className="btn btn-success"
          onClick={() => navigate(`/order/invoice/${id}`)}
        >
          Invoice
        </button>
      </div>

      <div className="row">
        <div className="col-md-6">
          <p>
            <b>Order Id</b> : {data?.order._id}
          </p>
          <p>
            <b>Shipping Info</b>
          </p>
          <p>{data?.order.shippingInfo.name}</p>
          <p>{data?.order.shippingInfo.phone_no}</p>
          <p>{data?.order.shippingInfo.email}</p>
          <p>{data?.order.shippingInfo.address}</p>
          <p className="d-inline">{data?.order.shippingInfo.city} ,</p>
          <p className="d-inline">{data?.order.shippingInfo.state} ,</p>
          <p className="d-inline">{data?.order.shippingInfo.country}</p>
          <p>{data?.order.shippingInfo.pinCode}</p>
          <p>{data?.order.shippingInfo.landmark}</p>
          <p>{data?.order.shippingInfo.note}</p>
        </div>
        <div className="col-md-6">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Product image</th>
                <th>Product name</th>
                <th>Product price</th>
                <th>Product quantity</th>
              </tr>
            </thead>
            <tbody>
              {data?.order.orderItems.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <img className="align-content-center" src={item?.image} width={"50px"} height={"50px"} alt="" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end">
            <p>
              <b>Item Price</b> :{data?.order?.itemsPrice?.toFixed(2)}
            </p>
            <p>
              <b>Tax Amount</b> :{data?.order.taxAmount.toFixed(2)}
            </p>
            <p>
              <b>Shipping Amount</b> :
              {data?.order.shippingAmount
                ? data?.order.shippingAmount.toFixed(2)
                : "0"}
            </p>
            <p>
              <b>Total Amount</b> :{totalAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>)} </>
  );
};

export default OrderDetails;
