import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../../components/layout/AuthCard";
import { useForgotPasswordMutation } from "../../store/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { isAuthorized } = useSelector((state) => {
    return state.auth;
  });
  const [forgotPassword, { isLoading, isSuccess, error, isError }] =
    useForgotPasswordMutation();

  useEffect(() => {
    isAuthorized && navigate("/");

    if (error) {
      toast.error(error.data.message)
    }
    if (isSuccess) {
      toast.success("Email Sent Successfully");
      navigate("/")
    }
  }, [isAuthorized, error, isSuccess]);
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const submit_handler = (e) => {
    e.preventDefault();
    console.log();
    forgotPassword({ email });
  };
  return (
    <AuthCard>
      <form onSubmit={submit_handler}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary d-inline-block">
          Forgot Password
        </button>
        <Link to={"/login"} className="ms-2 text-decoration-none text-black">
          Login Now?
        </Link>
      </form>
    </AuthCard>
  );
};

export default ForgotPassword;
