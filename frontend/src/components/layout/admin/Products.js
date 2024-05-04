import { MDBDataTable } from "mdbreact";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminLayout from "./AdminLayout";
import { useEffect } from "react";
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "../../../store/api/productApi";

const Products = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllProductQuery();

  const [deleteProduct, { isSuccess, error }] = useDeleteProductMutation();
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Product Deleted Successfully");
      navigate("/admin/products")
      
    }
  }, [error , isSuccess]);
  const deleteHandler = (id) => {
    deleteProduct(id);
  };
  const productData = {
    columns: [
      {
        label: "Id",
        field: "_id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Price",
        field: "price",
        sort: "asc",
        width: 150,
      },

      {
        label: "Stock",
        field: "stock",
        sort: "asc",
        width: 150,
      },
      {
        label: "Category",
        field: "category",
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

  data?.product.forEach((item, index) => {
    productData?.rows.push({
      _id: index + 1,
      name: `${item?.name.length >= 20 ? `${item?.name.substring(0, 20)}...` : item?.name}`,
      price: item?.price,
      stock:
        item?.stock == 0 ? (
          <p className="text-danger">
            <b>Out Of Stock</b>
          </p>
        ) : (
          <p className="text-success">
            <b>{item?.stock}</b>
          </p>
        ),
      category: item?.category,
      actions: (
        <>
          <button
            onClick={() => navigate(`/product/${item?._id}`)}
            className="btn btn-outline-success ms-1"
          >
            <i class="fa-solid fa-eye"></i>
          </button>
          <button
            onClick={() => navigate(`/admin/reviews/${item?._id}`)}
            className="btn btn-info ms-1"
          >
            <i class="fa-solid fa-star"></i>
          </button>
          <button
            onClick={() => navigate(`/admin/product/${item?._id}`)}
            className="btn btn-outline-warning ms-1"
          >
            <i class="fa-solid fa-pencil"></i>
          </button>
          <button
            onClick={() => navigate(`/admin/product/${item?._id}/upload_image`)}
            className="btn btn-outline-primary ms-1"
          >
            <i class="fa-solid fa-image"></i>
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
          <MDBDataTable data={productData} bordered striped />
        </AdminLayout>
      )}
    </>
  );
};

export default Products;
