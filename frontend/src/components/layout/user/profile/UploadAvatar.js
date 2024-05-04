import React, { useEffect, useState } from "react";
import Profile from "../../../../pages/user/Profile";
import { useSelector } from "react-redux";
import { useUpdateAvatarMutation } from "../../../../store/api/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UploadAvatar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState();
  const [preview, setPreview] = useState(user.avatar ? user.avatar.url : "");
  const [updateAvatar, { isError, isLoading, isSuccess, error }] =
    useUpdateAvatarMutation();
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Avatar Updated Successfully");
      navigate("/profile");
    }
  }, [isError, isSuccess]);
  const handleChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState == 2) {
        setAvatar(reader.result);
        setPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  const submit_handler = (e) => {
    e.preventDefault();
    updateAvatar({ avatar });
  };
  return (
    <Profile>
      <div>
        <div className="container mt-4">
          <div className="row justify-content-center align-content-center">
            <div className="col-md-4 bg-body-secondary p-3 rounded">
              <img
                src={preview}
                className="rounded-circle img-fluid me-auto ms-auto"
                style={{ height: "64px", width: "64px" }}
                alt=""
              />
              <form onSubmit={submit_handler}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Uplaod Avatar
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="avatar"
                    name="avatar"
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary d-inline-block"
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Profile>
  );
};

export default UploadAvatar;
