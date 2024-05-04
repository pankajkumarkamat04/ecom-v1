import React from "react";
import ProfileSideBar from "../../components/layout/user/profile/ProfileSideBar";
import { useSelector } from "react-redux";

const Profile = ({ children }) => {
  const menuItems = [
    {
      name: "My Profile",
      Url: "/profile",
    },
    {
      name: "Update Profile",
      Url: "/profile/update",
    },
    {
      name: "Update Password",
      Url: "/profile/password",
    },
    {
      name: "Update Avatar",
      Url: "/profile/avatar",
    },
    {
      name: "Logout",
    },
  ];
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-12">
            <ProfileSideBar menuItems={menuItems} />
          </div>
          <div className="col-md-9 col-12">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
