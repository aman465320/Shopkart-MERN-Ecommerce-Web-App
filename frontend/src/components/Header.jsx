import React from "react";
import { NavLink, Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { useAuth } from "../context/global";
import { toast } from "react-hot-toast";
import axios from "axios";
import SearchForm from "./Forms/SearchForm";
import { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { Badge } from "antd";
import { MdCategory } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { AiFillDashboard } from "react-icons/ai";
import { IoLogOutSharp } from "react-icons/io5";
import { GoSignIn } from "react-icons/go";
import { FaLockOpen } from "react-icons/fa";
import "../styles/components_styles/header.css";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [cart] = useCart();
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`/api/v1/categories/all-categories`);
      if (data.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleSubmit = async () => {
    const userName = auth.user.name;
    // clearing cookie
    await axios.get(`/api/v1/users/logout`, {
      withCredentials: true,
    });

    // setting user to logged out user
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    // clearing local storage
    localStorage.removeItem("auth");
    toast.success(`See you later ${userName}`);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse "
            id="navbarTogglerDemo01"
          >
            <Link className="navbar-brand" to="/">
              <HiShoppingCart /> SHOPKART
            </Link>


            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <SearchForm />
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  <AiFillHome className="mb-1" /> Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/"}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MdCategory className="mb-1 me-1" />
                  CATEGORIES
                </Link>
                <ul className="dropdown-menu">
                  {categories.map((item) => (
                    <li key={item._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${item._id}`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* conditional rendering on basis of auth object */}

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      <GoSignIn className="mb-1 me-1" />
                      Register
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      <FaLockOpen className="mb-1 me-1" />
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Welcome {auth?.user?.name}
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          <AiFillDashboard className="mb-1 me-1" />
                          Dashboard
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/login"
                          onClick={handleSubmit}
                        >
                          <IoLogOutSharp className="mb-1 me-1" />
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink className="nav-link cart-link" to="/cart">
                    <HiShoppingCart />
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
