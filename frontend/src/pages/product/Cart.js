import React from "react";
import { useSelector } from "react-redux";
import CartItems from "../../components/layout/order/CartItems";
import ItemsPriceTotal from "../../components/layout/order/CartItemsTotalPrice";

const Cart = () => {
  const { cartItems: cart } = useSelector((state) => state.cart);

  if (cart.length == 0) {
    return <>
    <div>
      <h2 className="text-center pt-3 pb-3">Your Cart Have 0 Item</h2></div></>
  }
  
  return (
    <div className="container">
      <h2 className="text-center">Cart</h2>
      <div className="row">
        <div className="col-md-9">
          {cart.map((item, index) => (
              <CartItems
                key={index}
                product={item?.product}
                name={item.name}
                image={item?.image?.url}
                price={item.price}
                quantity={item.quantity}
              />
          ))}
        </div>
        <div className="col-md-3">
          <ItemsPriceTotal />
        </div>
      </div>
    </div>
  );
};

export default Cart;
