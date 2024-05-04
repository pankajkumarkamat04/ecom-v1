import { MDBDataTable } from "mdbreact";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminLayout from "./AdminLayout";
import { useEffect } from "react";
import { useDeleteOrderMutation, useGetAllOrdersQuery } from "../../../store/api/orderApi";

const Orders = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllOrdersQuery();

  const [deleteOrder, { isSuccess, error }] = useDeleteOrderMutation();
  const order = data?.orders;
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Order Deleted Successfully");
      
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
      { label: "Buyer Name", field: "buyername", sort: "asc", width: 150 },
      {
        label: "Order Date",
        field: "orderdate",
        sort: "asc",
        width: 150,
      },
      {
        label: "Total Amount",
        field: "totalamount",
        sort: "asc",
        width: 150,
      },

      {
        label: "Payment Status",
        field: "paymentstatus",
        sort: "asc",
        width: 150,
      },
      {
        label: "Order Status",
        field: "orderstatus",
        sort: "asc",
        width: 150,
      },
      {
        label: "Actions",
        field: "actions",
        sort: "asc",
        width: 150,
      },
    ],
    rows: [],
  };
  const deleteHandler = (id) => {
    deleteOrder(id);
  };
  order?.forEach((item, index) => {
    orderData?.rows.push({
      _id: index + 1,
      buyername: `${
        item?.shippingInfo.name.length >= 20
          ? `${item?.shippingInfo.name.substring(0, 20)}...`
          : item?.shippingInfo.name
      }`,
      orderdate: item?.createdAt.split("T")[0],
      totalamount: item?.totalAmount,
      paymentstatus:
        item?.paymentInfo?.status == "paid" ? (
          <p className="text-success">
            <b>{item?.paymentInfo?.status}</b>
          </p>
        ) : (
          <p className="text-danger">
            <b>{item?.paymentInfo?.status}</b>
          </p>
        ),
      orderstatus:
        item?.orderStatus == "Delivered" ? (
          <p className="text-success">
            <b>{item?.orderStatus}</b>
          </p>
        ) : (
          <p className="text-danger">
            <b>{item?.orderStatus}</b>
          </p>
        ),
      actions: (
        <>
          <button
            onClick={() => navigate(`/admin/order/${item?._id}`)}
            className="btn btn-outline-warning ms-1"
          >
            <i class="fa-solid fa-pencil"></i>
          </button>
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

export default Orders;
