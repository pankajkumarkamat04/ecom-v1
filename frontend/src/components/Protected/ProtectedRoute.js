import React from "react";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, admin }) => {
  const { user, isAuthorized, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );
  }

  if (!isAuthorized) {
    return <Navigate to={"/login"} replace />;
  }

  if (admin && user?.role !== "admin") {
    return <Navigate to={"/"} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
