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
import { useNavigate } from "react-router-dom";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "../../../store/api/userApi";
const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const {
    data: userData,
    isSuccess: userIsSuccess,
    isLoading: userIsLoading,
  } = useGetUserProfileQuery(id);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [updateUserProfile, { error, isLoading, isSuccess }] =
  useUpdateUserProfileMutation();
  useEffect(() => {
    if (error) {
      toast.error(error?.data.message);
    }
    if (isSuccess) {
      toast.success("User Updated Successfully");
      navigate("/admin/users");
    }
    if (userIsSuccess) {
      console.log(userData);
      setUser({
        name: userData?.user.name,
        email: userData?.user.email,
        phone_no: userData?.user.phone_no,
        role: userData?.user.role,
      });
    }
  }, [error, isSuccess, userIsSuccess]);
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const sumbitHandler = (e) => {
    e.preventDefault();
    updateUserProfile({ id, body: user });
  };

  return (
    <>
      {userIsLoading ? (
        <Loader />
      ) : (
        <AdminLayout>
          <h1 className="text-center">Edit User</h1>
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
                    value={user?.name}
                    onChange={changeHandler}
                  />
                </div>
                <div className="w-50 p-2">
                  <label htmlFor="price">Phone No</label>
                  <input
                    className="form-control"
                    type="number"
                    name="phone_no"
                    value={user?.phone_no}
                    id="phone_no"
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="w-50 p-2">
                  <label htmlFor="category">Role</label>
                  <select
                    name="role"
                    value={user?.role}
                    id="role"
                    className="form-control"
                    onChange={changeHandler}
                  >
                    <option key={"admin"} value="admin">
                      Admin
                    </option>
                    <option key={"user"} value="user">
                      User
                    </option>
                  </select>
                </div>
                <div className="w-50 p-2">
                  <label htmlFor="stock">Email</label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    id="eamil"
                    value={user?.email}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="p-2">
                <button onClick={sumbitHandler} disabled={isLoading} className="btn btn-primary">
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

export default EditUser;
