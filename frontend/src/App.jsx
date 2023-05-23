import React from "react";
import "./styles/app.css";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Error from "./pages/Error";

// auth imports
import Login from "./pages/Auth_pages/Login";
import Register from "./pages/Auth_pages/Register";
import ForgetPassword from "./pages/Auth_pages/ForgetPassword";

// User imports
import Dashboard from "./pages/Protected/Dashboard";
import Protected from "./components/Routes/Protected";
import Profile from "./pages/Protected/Profile";
import Orders from "./pages/Protected/Orders";
import Search from "./pages/Search";
import DetailedProduct from "./pages/DetailedProduct";

// Admin imports
import AdminDashboard from "./pages/Admin_pages/AdminDashboard";
import AdminProtected from "./components/Routes/AdminProtected";
import CreateCategory from "./pages/Admin_pages/CreateCategory";
import CreateProduct from "./pages/Admin_pages/CreateProduct";
import Products from "./pages/Admin_pages/Products";
import SingleProduct from "./pages/Admin_pages/SingleProduct";
import AdminOrders from "./pages/Admin_pages/AdminOrders";

import "antd/dist/reset.css";
import Category from "./pages/Category";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <>
      <Header />
      <main className="main p-3">
        <Routes>
          <Route path="/" element={<Home title={`Ecommerce App`} />} />

          {/* auth routes */}

          <Route path="/login" element={<Login title={`Login`} />} />
          <Route path="/register" element={<Register title={`Register`} />} />
          <Route
            path="/forget-password"
            element={<ForgetPassword title={"Forget Password"} />}
          />

          {/* protected nested route */}

          {/* user routes */}
          <Route path="/dashboard" element={<Protected />}>
            {/* path = "" in nested means "/dashboard" but path = "/abcd meadns ""/dashboard/abcd" */}
            <Route path="user" element={<Dashboard title={`Dashboard`} />} />
            <Route
              path="user/profile"
              element={<Profile title={`My profile`} />}
            />
            <Route
              path="user/orders"
              element={<Orders title={`My orders`} />}
            />
          </Route>

          {/* admin routes */}

          <Route path="/dashboard" element={<AdminProtected />}>
            {/* path = "" in nested means "/dashboard" but path = "/abcd meadns ""/dashboard/abcd" */}
            <Route
              path="admin"
              element={<AdminDashboard title={`Admin Dashboard`} />}
            />
            <Route
              path="admin/create-category"
              element={<CreateCategory title={`Create Category`} />}
            />
            <Route
              path="admin/create-product"
              element={<CreateProduct title={`Create Product`} />}
            />
            <Route
              path="admin/particular-product/:id"
              element={<SingleProduct title={`Update Product`} />}
            />
            <Route
              path="admin/products"
              element={<Products title={`Products`} />}
            />
            <Route
              path="admin/orders"
              element={<AdminOrders title={`Admin Orders`} />}
            />
          </Route>

          {/* pages routes */}
          <Route path="/about" element={<About title={`About us`} />} />

          <Route path="/contact" element={<Contact title={`Contact us`} />} />

          <Route path="/policy" element={<Policy title={`Policy`} />} />

          {/* SEARCH PRODUCT PAGE */}
          <Route path="/search" element={<Search title={`Search`} />} />

          {/* SINGLE PRODUCT PAGE */}
          <Route
            path="/detailed-product/:id"
            element={<DetailedProduct title={`Product Details`} />}
          />

          {/* PRODUCT BASED ON CATEGORY PAGE */}
          <Route
            path="/category/:id"
            element={<Category title={`Category Details `} />}
          />

          {/* CART PAGE */}
          <Route path="/cart" element={<Cart title={`Cart Details `} />} />

          {/* error route */}

          <Route path="*" element={<Error title={`Page not found`} />} />
        </Routes>

        <Toaster />
      </main>
      <Footer />
    </>
  );
};

export default App;
