import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../store/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AuthCard from "../../components/layout/AuthCard";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone_no: "",
    password: "",
  });
  const navigate = useNavigate();
  const [register, { isLoading, isError, isSuccess, data, error }] =
    useRegisterMutation();

  const { isAuthorized } = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    isAuthorized && navigate("/");

    if (error) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      toast.success("Login Successfully");
    }
  }, [isAuthorized, error, isSuccess]);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const registerHandler = (e) => {
    e.preventDefault();
    register(user);
  };

  return (
    <AuthCard>
      <form onSubmit={registerHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
        </div>
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
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone No
          </label>
          <input
            type="number"
            className="form-control"
            id="phone"
            name="phone_no"
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleChange}
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary d-inline-block">
          Register
        </button>
        <Link
          to={"/forgot-password"}
          className="ms-2 text-decoration-none text-black"
        >
          Forgot Password
        </Link>
        <Link to={"/login"} className="text-decoration-none d-block text-black">
          Login Now?
        </Link>
      </form>
    </AuthCard>
  );
};

export default Register;
