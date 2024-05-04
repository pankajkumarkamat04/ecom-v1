import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { setCartItems } from "../../../store/slice/cartSlice";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart);

  const addCart = async (e) => {
    e.preventDefault();
    const cartProduct = {
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    };

    dispatch(setCartItems(cartProduct));
  };
  return (
    <div className="col-md-3">
      <div className="card mb-3">
        <img
          src={product?.images[0]?.url}
          className="card-img-top"
          style={{ height: "200px" }}
          alt="Product Image"
        />
        <div className="card-body">
          <Link to={`/product/${product._id}`} className="card-title">
            {product.name}
          </Link>
          <p className="card-text">
            <strong style={{ color: "#E6432F" }}>${product.price}</strong>
          </p>
          <StarRatings
            rating={product.rating}
            starRatedColor="#E6432F"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="1px"
          />
          <a onClick={addCart} className="btn btn-primary">
            Add to Cart
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
