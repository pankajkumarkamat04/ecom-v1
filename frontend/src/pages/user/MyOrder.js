import React, { useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { useGetOrderQuery } from "../../store/api/orderApi";
import { TailSpin } from "react-loader-spinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { clearCart, setCartItems } from "../../store/slice/cartSlice";
import { useDispatch } from "react-redux";

const MyOrder = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams();
  if (searchParams.has("success")) {
    dispatch(clearCart())
  }
  const navigate = useNavigate();
  const { data, isLoading, error, isError } = useGetOrderQuery();
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  const orderData = {
    columns: [
      {
        label: "Id",
        field: "_id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Items Price",
        field: "itemsPrice",
        sort: "asc",
        width: 150,
      },
      {
        label: "Shipping Amount",
        field: "shippingAmount",
        sort: "asc",
        width: 150,
      },
      {
        label: "Tax Amount",
        field: "taxAmount",
        sort: "asc",
        width: 150,
      },
      {
        label: "Total Amount",
        field: "totalAmount",
        sort: "asc",
        width: 150,
      },
      {
        label: "Payment  Status",
        field: "paymentStatus",
        sort: "asc",
        width: 150,
      },
      {
        label: "Payment  Method",
        field: "paymentMethod",
        sort: "asc",
        width: 150,
      },
      {
        label: "Order Status",
        field: "orderStatus",
        sort: "asc",
        width: 150,
      },
      {
        label: "View Order",
        field: "viewOrder",
        sort: "asc",
        width: 150,
      },
    ],
    rows: [],
  };

  data?.order.forEach((item, index) => {
    let totalAmount = item.itemsPrice + item.taxAmount + item.shippingAmount;
    orderData.rows.push({
      _id: index + 1,
      itemsPrice: item.itemsPrice.toFixed(2),
      shippingAmount: item.shippingAmount || "No Shipping Charges",
      taxAmount: item.taxAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      paymentMethod: item.paymentMethod,
      paymentStatus: item.paymentInfo.status,
      orderStatus: item.orderStatus,
      viewOrder: (
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/order/${item._id}`)}
        >
          View Order
        </button>
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
        <div className="container">
          <h2 className="text-center pb-3b pt-3">My Order</h2>
          <MDBDataTable data={orderData} bordered striped />
        </div>
      )}
    </>
  );
};

export default MyOrder;
