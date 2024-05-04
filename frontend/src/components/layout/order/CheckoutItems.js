import React from "react";
import { useSelector } from "react-redux";

const CheckoutItems = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div>
      <table className="table table-s">
        <thead className="">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.product}>
              <td className="col-md-6">
                {item?.name.length >= 20
                  ? `${item?.name.slice(0, 20)}...`
                  : item?.name}
              </td>
              <td className="col-md-3">{item?.quantity}</td>
              <td className="col-md-3">
                <b>{(item?.quantity * item?.price).toFixed(2)}</b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckoutItems;
