import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AuthCard from "../../components/layout/AuthCard";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { isAuthorized } = useSelector((state) => {
    return state.auth;
  });
  const [login, { isLoading, isSuccess, isError, data, error }] =
    useLoginMutation();

  useEffect(() => {
    isAuthorized && navigate("/");

    if (error) {
      toast.error(error.data.message)
    }
    if (isSuccess) {
      toast.success("Login Successfully")
    }
  }, [isAuthorized , error ,isSuccess]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    login(user);
  };

  return (
    <AuthCard>
      <form onSubmit={loginHandler}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary d-inline-block">
          Login
        </button>
        <Link
          to={"/forgot-password"}
          className="ms-2 text-decoration-none text-black"
        >
          Forgot Password
        </Link>
        <Link
          to={"/register"}
          className="text-decoration-none d-block text-black"
        >
          Register Now?
        </Link>
      </form>
    </AuthCard>
  );
};

export default Login;
