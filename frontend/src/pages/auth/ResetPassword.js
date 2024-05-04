import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthCard from "../../components/layout/AuthCard";
import {
  useResetPasswordMutation,
  useResetPasswordVerifyQuery,
} from "../../store/api/authApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  console.log(token);
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { isAuthorized } = useSelector((state) => {
    return state.auth;
  });
  const [resetPassword, { isError, error, isLoading, isSuccess }] =
    useResetPasswordMutation();
  useEffect(() => {
    isAuthorized && navigate("/");

    if (error) {
      console.log(error);
      toast.error(error.data.message);
    }
    if (isSuccess) {
      toast.success("Password Reset Successfully");
      navigate("/login")
    }
  }, [isAuthorized, error, isSuccess]);
  const onChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  const submit_handler = (e) => {
    e.preventDefault();
    resetPassword({password, token});
  };
  return (
    <AuthCard>
      <form onSubmit={submit_handler}>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <label htmlFor="confirm-confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="text"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <button type="submit" className="btn btn-primary d-inline-block">
          Reset Password
        </button>
      </form>
    </AuthCard>
  );
};

export default ResetPassword;
