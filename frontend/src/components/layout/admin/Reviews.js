import { MDBDataTable } from "mdbreact";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminLayout from "./AdminLayout";
import { useEffect } from "react";
import { useDeleteReviewMutation, useGetReviewQuery } from "../../../store/api/productApi";
import {useParams} from "react-router-dom"

const Reviews = () => {
    const {id} = useParams()
  const navigate = useNavigate();
  const { data, isLoading } = useGetReviewQuery(id);

  const [deleteReview, { isSuccess, error }] = useDeleteReviewMutation();
  const order = data?.orders;
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Review Deleted Successfully");
      
    }
  }, [error, isSuccess]);
  const orderData = {
    columns: [
      {
        label: "Sl No",
        field: "_id",
        sort: "asc",
        width: 150,
      },
      { label: "Name", field: "name", sort: "asc", width: 150 },
      {
        label: "Review Date",
        field: "reviewdate",
        sort: "asc",
        width: 150,
      },
      {
        label: "Rating",
        field: "rating",
        sort: "asc",
        width: 150,
      },

      {
        label: "Comment",
        field: "comment",
        sort: "asc",
        width: 150,
      },
      {
        label: "actions",
        field: "actions",
        sort: "asc",
        width: 150,
      },
    ],
    rows: [],
  };
  const deleteHandler = (id) => {
    deleteReview(id);
  };
  data?.result?.forEach((item, index) => {
    orderData?.rows.push({
      _id: index + 1,
      name: `${
        item?.user.name.length >= 20
          ? `${item?.user.name.substring(0, 20)}...`
          : item?.user.name
      }`,
      reviewdate: item?.createdAt.split("T")[0],
      rating: item?.rating,
      comment: item?.comment,
      actions: (
        <>
          <button
            onClick={() => deleteHandler(item?._id)}
            className="btn btn-outline-danger ms-1"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </>
      ),
    });
  });

  return (
    <>
      {isLoading ? (
        <TailSpin
          visible={true}
          height="40"
          width="40"
          color="#0B5ED7"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <AdminLayout>
          <h2 className="text-center pb-3b pt-3">My Order</h2>
          <MDBDataTable data={orderData} bordered striped />
        </AdminLayout>
      )}
    </>
  );
};

export default Reviews;
