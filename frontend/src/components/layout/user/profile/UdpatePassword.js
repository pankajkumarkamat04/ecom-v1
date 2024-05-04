import React, { useEffect, useState } from "react";
import Profile from "../../../../pages/user/Profile";
import { useUpdatePasswordMutation } from "../../../../store/api/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthCard from "../../AuthCard";

const UdpatePassword = () => {
  const [password, setPassword] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [updatePassword, { isLoading, isError, error, isSuccess }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Password Updated Successfully");
      navigate("/profile");
    }
  }, [isError, isSuccess]);

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const submit_handler = async (e) => {
    e.preventDefault();
    await updatePassword(password);
  };
  return (
    <Profile>
      <AuthCard>
        <form onSubmit={submit_handler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Old Password
            </label>
            <input
              type="text"
              className="form-control"
              id="oldPassword"
              name="oldPassword"
              value={password.oldPassword}
              onChange={handleChange}
            />
            <label htmlFor="email" className="form-label">
              New Password
            </label>
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              value={password.password}
              onChange={handleChange}
            />
            <label htmlFor="email" className="form-label">
              Confirm Password
            </label>
            <input
              type="text"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={password.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary d-inline-block">
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </AuthCard>
    </Profile>
  );
};

export default UdpatePassword;
