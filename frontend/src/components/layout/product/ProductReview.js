import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import {
  useCanReviewQuery,
  useCreateReviewMutation,
} from "../../../store/api/productApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ProductReview = () => {
  const { id } = useParams();
  const { isAuthorized } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [createReview, { isLoading, error, isSuccess }] =
    useCreateReviewMutation();
  let { data, error: canReviewError } = useCanReviewQuery(id);
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (canReviewError) {
      if (isAuthorized) {
        toast.error(canReviewError?.data?.message);
      }
    }
    if (isSuccess) {
      toast.success("Review Placed Successfully");
    }
  }, [isSuccess, error, canReviewError]);
  const submit_handler = () => {
    const body = {
      product: id,
      comment,
      rating,
    };
    console.log(body);
    createReview(body);
  };
  return (
    <div>
      {isAuthorized && data?.canReview ? (
        <>
          <hr />
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#reviewProduct"
          >
            Submit Your Review
          </button>
        </>
      ) : (
        ""
      )}
      <div
        class="modal fade"
        id="reviewProduct"
        tabIndex="-1"
        aria-labelledby="reviewProductLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Submit Your Review
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <StarRatings
                rating={rating}
                starRatedColor="#E6432F"
                numberOfStars={5}
                name="rating"
                starDimension="30px"
                changeRating={(e) => setRating(e)}
              />
              <label className="d-block" htmlFor="review_field">
                Review
              </label>
              <input
                id="review_field"
                type="text"
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={submit_handler}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
