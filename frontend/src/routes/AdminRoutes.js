import React from "react";
import ProtectedRoute from "../components/Protected/ProtectedRoute";
import { Route } from "react-router-dom";
import Dashboard from "../components/layout/admin/Dashboard";
import AddNewProduct from "../components/layout/admin/AddNewProduct";
import Products from "../components/layout/admin/Products";
import EditProduct from "../components/layout/admin/EditProduct";
import UploadImages from "../components/layout/admin/UploadImages";
import Orders from "../components/layout/admin/Orders";
import ProcessOrder from "../components/layout/admin/ProcessOrder";
import Users from "../components/layout/admin/Users";
import EditUser from "../components/layout/admin/EditUser";
import Reviews from "../components/layout/admin/Reviews";

const AdminRoutes = () => {
  return (
    <>
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute admin={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/add/product"
        element={
          <ProtectedRoute admin={true}>
            <AddNewProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute admin={true}>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/product/:id"
        element={
          <ProtectedRoute admin={true}>
            <EditProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/product/:id/upload_image"
        element={
          <ProtectedRoute admin={true}>
            <UploadImages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute admin={true}>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/order/:id"
        element={
          <ProtectedRoute admin={true}>
            <ProcessOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute admin={true}>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/user/:id"
        element={
          <ProtectedRoute admin={true}>
            <EditUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reviews/:id"
        element={
          <ProtectedRoute admin={true}>
            <Reviews />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default AdminRoutes;
