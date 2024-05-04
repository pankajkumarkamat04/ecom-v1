import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useGetProductDetailQuery,
  useUpdateProductMutation,
} from "../../../store/api/productApi";
import { useParams } from "react-router-dom";
import ProductCategory from "../../../helpers/ProductCategory";
import AdminLayout from "./AdminLayout";
import Loader from "../Loader";
import {useNavigate} from "react-router-dom"
const EditProduct = () => {
    const navigate = useNavigate()
  const { id } = useParams();
  console.log(id);
  const {
    data: productData,
    error: productError,
    isLoading: productIsLoading,
    isSuccess: productIsSuccess,
  } = useGetProductDetailQuery({ id });
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });
  console.log(product);
  const [updateProduct, { data, error, isLoading, isSuccess }] =
    useUpdateProductMutation();
  useEffect(() => {
    if (error) {
      toast.error(error?.data.message);
    }
    if (isSuccess) {
      toast.success("Product Updated Successfully");
      navigate("/admin/products")
    }
    if (productIsSuccess) {
      setProduct({
        name: productData?.result.name,
        price: productData?.result.price,
        category: productData?.resultcategory,
        stock: productData?.result.stock,
        description: productData?.result.description,
      });
    }
  }, [error, isSuccess, productIsSuccess]);
  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const sumbitHandler = (e) => {
    e.preventDefault();
    console.log(product);
    updateProduct({ id, body: product });
  };

  return (
    <>
      {productIsLoading ? (
        <Loader />
      ) : (
        <AdminLayout>
          <h1 className="text-center">Add New Product</h1>
          <div className="container">
            <form>
              <div className="d-flex">
                <div className="w-50 p-2">
                  <label htmlFor="name">Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    value={product?.name}
                    onChange={changeHandler}
                  />
                </div>
                <div className="w-50 p-2">
                  <label htmlFor="price">Price</label>
                  <input
                    className="form-control"
                    type="number"
                    name="price"
                    value={product?.price}
                    id="price"
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="w-50 p-2">
                  <label htmlFor="category">Category</label>
                  <select
                    name="stock"
                    value={product?.category}
                    id="stock"
                    className="form-control"
                    onChange={changeHandler}
                  >
                    {ProductCategory.map((category) => (
                      <option key={category} value="category">
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-50 p-2">
                  <label htmlFor="stock">Stock</label>
                  <input
                    className="form-control"
                    type="number"
                    name="stock"
                    id="stock"
                    value={product?.stock}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="p-2">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  id="description"
                  cols="30"
                  value={product?.description}
                  rows="4"
                  onChange={changeHandler}
                ></textarea>
              </div>
              <div className="p-2">
                <button onClick={sumbitHandler} className="btn btn-primary">
                  Edit Product
                </button>
              </div>
            </form>
          </div>
        </AdminLayout>
      )}
    </>
  );
};

export default EditProduct;
