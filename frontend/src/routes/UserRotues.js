import React from 'react'
import { Route } from 'react-router-dom'
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import MyProfile from "../components/layout/user/profile/MyProfile";
import UpdateProfile from "../components/layout/user/profile/UpdateProfile";
import UdpatePassword from "../components/layout/user/profile/UdpatePassword";
import ProtectedRoute from "../components/Protected/ProtectedRoute";
import UploadAvatar from "../components/layout/user/profile/UploadAvatar";
import ResetPasswordVerify from "../components/Protected/ResetPasswordVerify";
import ProductDetail from "../pages/product/ProductDetail";
import Product from "../pages/product/Product";
import Cart from "../pages/product/Cart";
import CheckOut from "../pages/product/CheckOut";
import MyOrder from "../pages/user/MyOrder";
import OrderDetails from "../pages/user/OrderDetails";
import Inovice from "../components/layout/order/Inovice";

const UserRotues = () => {
  return (
    <>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPasswordVerify>
          <ResetPassword />
        </ResetPasswordVerify>} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/profile/password" element={<ProtectedRoute>
          <UdpatePassword />
        </ProtectedRoute>} />
        <Route path="/profile/avatar" element={<ProtectedRoute>
          <UploadAvatar />
        </ProtectedRoute>} />
        <Route path="/order" element={<ProtectedRoute>
          <MyOrder />
        </ProtectedRoute>} />
        <Route path="/order/:id" element={<ProtectedRoute>
          <OrderDetails />
        </ProtectedRoute>} />
        <Route path="/order/invoice/:id" element={<ProtectedRoute>
          <Inovice />
        </ProtectedRoute>} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
      </>
  )
}

export default UserRotues
