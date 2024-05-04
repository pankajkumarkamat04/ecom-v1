import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetProductDetailQuery,
  useGetReviewQuery,
} from "../../store/api/productApi";
import { TailSpin } from "react-loader-spinner";
import StarRatings from "react-star-ratings";
import ProductImg from "../../components/layout/product/ProductImg";
import { setCartItems } from "../../store/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductReview from "../../components/layout/product/ProductReview";
import Loader from "../../components/layout/Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetProductDetailQuery({ id });
  const [quantity, setQuantity] = useState(1);
  const product = isLoading ? "" : data?.result;
  const {
    data: reviewData,
    isLoading: reviewIsLoading,
    error: reviewError,
  } = useGetReviewQuery(id);

  const increaseQty = (e) => {
    const qty = document.querySelector("#quantity");

    if (product.stock <= qty.valueAsNumber) {
      return;
    }

    setQuantity(qty.valueAsNumber + 1);
  };
  const decreaseQty = () => {
    const qty = document.querySelector("#quantity");

    if (1 >= qty.valueAsNumber) {
      return;
    }

    setQuantity(qty.valueAsNumber - 1);
  };
  const { cartItems } = useSelector((state) => state.cart);

  const addCart = async (e) => {
    e.preventDefault();
    const cartProduct = {
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
    };

    dispatch(setCartItems(cartProduct));
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div id="carouselExample" className="carousel slide">
                  <div className="carousel-inner">
                    {product?.images.map((img, index) => (
                      <ProductImg img={img} index={index} key={img.public_id} />
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div className="col-md-6">
                <h5>{product?.name}</h5>
                <p>{product?.description}</p>
                <StarRatings
                  rating={product?.rating}
                  starRatedColor="#E6432F"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="1px"
                />
                <p className="d-inline-block">({product?.numOfReviews})</p>
                <h4
                  className="d-inline-block ms-2"
                  style={{ color: "#E6432F" }}
                >
                  ${product?.price}
                </h4>
                <div className="">
                  <button
                    className="btn btn-danger d-inline-block mt-1 me-1"
                    onClick={decreaseQty}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control d-inline-block"
                    id="quantity"
                    value={quantity}
                    readOnly
                    style={{ width: "50px" }}
                  />
                  <button
                    className="btn btn-success d-inline-block mt-1 ms-1"
                    onClick={increaseQty}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-primary d-inline-block mt-1 ms-2"
                    onClick={addCart}
                  >
                    Add To Cart
                  </button>
                </div>

                <ProductReview />
              </div>
            </div>

            <div>
              <hr />
              {reviewData?.result.map((review) => (
                <div key={review?._id} className="d-flex">
                  <img
                    src={
                      review?.user?.avatar
                        ? review?.user?.avatar.url
                        : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
                    }
                    className="rounded"
                    style={{ width: "70px", height: "70px" }}
                    alt=""
                  />
                  <div className="ps-2 align-content-center">
                    <StarRatings
                      rating={review?.rating}
                      starRatedColor="#E6432F"
                      numberOfStars={5}
                      name="rating"
                      starDimension="20px"
                    />
                    <p>{review?.comment}</p>
                    <p>
                      <b>{review?.user?.name}</b>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
