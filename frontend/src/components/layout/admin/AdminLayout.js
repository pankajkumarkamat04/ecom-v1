import React from "react";
import ProfileSideBar from "../user/profile/ProfileSideBar";

const AdminLayout = ({children}) => {
  const menuItems = [
    {
      name: "Dashboard",
      Url: "/admin/dashboard",
    },
    {
      name: "Add Product",
      Url: "/admin/add/product",
    },
    {
      name: "Products",
      Url: "/admin/products",
    },
    {
      name: "Orders",
      Url: "/admin/orders",
    },
    {
        name: "User",
        Url: "/admin/users",
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

export default AdminLayout;
