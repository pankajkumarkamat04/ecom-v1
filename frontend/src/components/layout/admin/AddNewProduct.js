import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import ProductCategory from "../../../helpers/ProductCategory";
import { useCreateProductMutation } from "../../../store/api/productApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddNewProduct = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "Electronics",
    stock: "",
    description: "",
    seller: user?.name,
  });

  console.log(user?.name);
  const [createProduct, { data, isLoading, error, isSuccess }] =
    useCreateProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data.message);
    }
    if (isSuccess) {
      toast.success("Product Created Successfully");
      navigate("/admin/products");
    }
  }, [error, isSuccess]);
  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const sumbitHandler = (e) => {
    e.preventDefault();
    console.log(product);
    createProduct({ body: product });
  };
  return (
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
                onChange={changeHandler}
              />
            </div>
            <div className="w-50 p-2">
              <label htmlFor="price">Price</label>
              <input
                className="form-control"
                type="number"
                name="price"
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
              rows="4"
              onChange={changeHandler}
            ></textarea>
          </div>
          <div className="p-2">
            <button onClick={sumbitHandler} className="btn btn-primary">
              Add New Product
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddNewProduct;
