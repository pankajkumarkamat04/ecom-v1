import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../../store/api/orderApi";
import toast from "react-hot-toast";

const ProcessOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [orderStatus, setOrderStatus] = useState("");
  const { data } = useGetOrderDetailsQuery(id);
  const [updateOrder, { error, isSuccess }] = useUpdateOrderMutation();
  const totalAmount =
    data?.order.itemsPrice + data?.order.taxAmount + data?.order.shippingAmount;

  useEffect(() => {
    if (data) {
      setOrderStatus(data?.order.orderStatus);
    }
    if (isSuccess) {
      toast.success("Order Status Updated");
    }
  }, [data, isSuccess]);
  const submithandler = () => {
    const body = {
      orderStatus,
    };
    updateOrder({ id, body });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h2>Order Details</h2>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <select
            className="form-control"
            style={{ width: "40%" }}
            name="status"
            id="status"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            <option value="Processing">Processing</option>
            <option value="Shipping">Shipping</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button
            className="btn btn-success ms-1"
            onClick={() => submithandler()}
            disabled={
              data?.order.orderStatus === "Cancelled" ||
              data?.order.orderStatus === "Delivered"
                ? true
                : false
            }
          >
            Update Status
          </button>
          <button
            className="btn btn-success ms-1"
            onClick={() => navigate(`/order/invoice/${id}`)}
          >
            Generate Invoice
          </button>
        </div>
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
                <tr key={item?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={item?.image.url} width={"75px"} alt="" />
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
    </div>
  );
};

export default ProcessOrder;
