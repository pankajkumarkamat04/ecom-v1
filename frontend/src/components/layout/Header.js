import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ProductSearch from "./product/ProductSearch";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../../store/api/userApi";
import { useLazyLogoutQuery } from "../../store/api/authApi";

const Header = () => {
  const navigate = useNavigate();
  const { isLoading } = useGetProfileQuery();
  const [logout] = useLazyLogoutQuery();
  const { user, isAuthorized } = useSelector((state) => {
    return state.auth;
  });

  const { cartItems } = useSelector((state) => state.cart);
  const [cartItemsCount, setCartItemsCount] = useState(
    cartItems ? cartItems.length : 0
  );
  useEffect(() => {
    setCartItemsCount(cartItems.length);
  }, [cartItems]);

  const logoutHandler = async () => {
    await logout();
    navigate(0);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            ECOM
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="col-md-4 navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to={"/"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/product"}>
                  Product
                </NavLink>
              </li>
            </ul>
            <ProductSearch />
            <div className="col-md-4  text-end">
              <button
                className="border-0 bg-transparent"
                onClick={() => navigate("/cart")}
              >
                <i class="fa fa-cart-shopping me-1 d-inline-block">
                  <sup className="d-inline-block rounded-circle p-2 bg-danger font-roboto">
                    {cartItemsCount}
                  </sup>
                </i>
              </button>

              {isLoading ? (
                "Loading..."
              ) : (
                <>
                  {isAuthorized ? (
                    <div class="dropdown d-inline-block">
                      <i class="fa fa-user me-1"></i>
                      <button
                        class="border-0 dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ backgroundColor: "#F8F9FA" }}
                      >
                        {user?.name || "user"}
                      </button>
                      <ul class="dropdown-menu">
                        {user?.role == "admin" ? (
                          <li>
                            <Link class="dropdown-item" to={"/admin/dashboard"}>
                              Dashboard
                            </Link>
                          </li>
                        ) : (
                          ""
                        )}
                        <li>
                          <Link class="dropdown-item" to={"/profile"}>
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link class="dropdown-item" to={"/order/"}>
                            Order
                          </Link>
                        </li>
                        <li>
                          <Link class="dropdown-item" onClick={logoutHandler}>
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link
                      className="text-black text-decoration-none"
                      to={"/login"}
                    >
                      <i class="fa fa-user"></i>
                      <span className="ms-1 font-roboto">Login/Register</span>
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
