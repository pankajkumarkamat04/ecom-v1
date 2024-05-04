import React, { useEffect, useState } from "react";
import Profile from "../../../../pages/user/Profile";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../../../../store/api/userApi";
import toast from "react-hot-toast";
const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [updateUser, setUpdateUser] = useState({
    name: user?.name,
    email: user?.email,
    phone_no: user?.phone_no,
  });
  const [updateProfile, { isLoading, isSuccess, isError, error }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Profile Updated Successfully");
      navigate("/profile");
    }
  }, [isError, isSuccess]);
  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };
  const submit_handler = async (e) => {
    e.preventDefault();
    await updateProfile(updateUser);
    navigate("/profile");
  };
  return (
    <Profile>
      <div>
        <div className="container mt-4">
          <div className="row justify-content-center align-content-center">
            <div className="col-md-4 bg-body-secondary p-3 rounded">
              <form onSubmit={submit_handler}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={updateUser?.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={updateUser?.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    name="phone_no"
                    value={updateUser?.phone_no}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary d-inline-block"
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Profile>
  );
};

export default UpdateProfile;
