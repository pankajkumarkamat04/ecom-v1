import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../../../store/api/authApi";
import toast from "react-hot-toast";

const ProfileSideBar = ({menuItems}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [logout, { isError, isSuccess, error }] = useLazyLogoutQuery();
  useState(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Logout Successfully");
    }
  }, [isError, isSuccess]);
  const logout_handler = async () => {
    await logout();
    navigate(0);
  };
  
  const url = location.pathname;

  return (
    <div className="mt-4">
      <ul className="nav flex-column border-1 border border-danger overflow-hidden rounded">
        {menuItems.map((menu, index) => (
          <li
            key={index}
            className={`nav-item p-sidemenu ${
              url == menu.Url ? "bg-primary text-white" : ""
            }`}
          >
            <Link
              className={`nav-link ${
                url == menu.Url ? "text-white" : "text-black"
              }`}
              to={menu.Url}
              onClick={menu.name == "Logout" ? logout_handler : ""}
            >
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileSideBar;
