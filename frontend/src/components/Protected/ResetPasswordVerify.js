import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useResetPasswordVerifyQuery } from "../../store/api/authApi";
import toast from "react-hot-toast";

const ResetPasswordVerify = ({ children }) => {
  const { token } = useParams();
  const { isError, error, isSuccess } = useResetPasswordVerifyQuery(token);
  if (error) {
    toast.error(error.data.message);
    return <Navigate to={"/forgot-password"} replace />;
  }
  return <>{children};</>;
};

export default ResetPasswordVerify;
