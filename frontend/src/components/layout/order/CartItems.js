import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteCartItem,
  increaseQuantity,
} from "../../../store/slice/cartSlice";
import { useGetProductDetailQuery } from "../../../store/api/productApi";

const CartItems = ({ name, image, price, quantity, product }) => {
  const [newQuantity, setNewQuantity] = useState(quantity);
  const dispatch = useDispatch();
  useEffect(() => {
    setNewQuantity(quantity);
  }, [quantity]);
  const deleteItem = () => {
    dispatch(deleteCartItem(product));
  };
  const decreaseQty = () => {
    const qtyCount = document.querySelector(`#quantity-${product}`);

    if (qtyCount.valueAsNumber <= 1) {
      return;
    }
    dispatch(decreaseQuantity(product));
  };
  const { data, isLoading } = useGetProductDetailQuery({id: product});
  const increaseQty = () => {
    const qtyCount = document.querySelector(`#quantity-${product}`);

    if (qtyCount.valueAsNumber >= data.result.stock) {
      return;
    }
    dispatch(increaseQuantity(product));
  };
  return (
    <>
      <div className="row">
        <div className="col-md-2">
          <img src={image} style={{ height: "50px", width: "50px" }} alt="" />
        </div>
        <div className="col-md-3 mt-auto mb-auto">
          <p>{name}</p>
        </div>
        <div className="col-md-2">
          <h6>${price}</h6>
        </div>
        <div className="col-md-3">
          <button
            className="btn btn-danger d-inline-block mt-1 me-1"
            onClick={decreaseQty}
          >
            -
          </button>
          <input
            type="number"
            className="form-control d-inline-block"
            id={`quantity-${product}`}
            value={newQuantity}
            readOnly
            style={{ width: "75px" }}
          />
          <button
            className="btn btn-success d-inline-block mt-1 ms-1"
            onClick={increaseQty}
          >
            +
          </button>
        </div>
        <div className="col-md-2">
          <button className="border-0 bg-white" onClick={deleteItem}>
            <i class="fa-solid fa-trash text-danger"></i>
          </button>
        </div>
      </div>
      <hr></hr>
    </>
  );
};

export default CartItems;
