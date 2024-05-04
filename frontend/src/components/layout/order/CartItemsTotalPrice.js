import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartItemsTotalPrice = () => {
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart);
  const units = cartItems.reduce((total , item) => (total + item.quantity) , 0)
  const subtotal = cartItems.reduce((total , item) => (total + item.price*item.quantity) , 0)
  return (
    <div className="d-flex flex-column bg-body-secondary p-3 rounded-2 border border-light">
      <div>
        <p className="d-block">
          Total Product : <b>{cartItems.length}</b>
        </p>
        <p className="d-block">
          Total Unit : <b>{units}</b>
        </p>
        <p className="d-block">
          Subtotal : <b>{Number(subtotal).toFixed(2)}</b>
        </p>
      </div>
      <hr></hr>
      <div>
        <button className="btn btn-success" onClick={() => navigate("/checkout")}>Procced To Check Out</button>
      </div>
    </div>
  );
};

export default CartItemsTotalPrice;
