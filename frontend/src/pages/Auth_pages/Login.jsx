import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/global";
import { FaUserAlt, FaLock, FaUserSecret } from "react-icons/fa";
const Login = ({ title }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`/api/v1/users/login`, {
        email,
        password,
      });
      if (data.success) {
        toast.success(data.message);
        // collecting user information
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        // saving information in local storage
        localStorage.setItem("auth", JSON.stringify(data));

        // redirecting to same page where login was required

        if (location.state) {
          navigate(location.state);
        } else {
          navigate("/");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Login
                      </p>
                      <div>
                        <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                          <div className="d-flex flex-row align-items-center mb-3">
                            <FaUserAlt className="me-3" />
                            <div class="form-outline flex-fill mb-0">
                              <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                                required
                              />
                            </div>
                          </div>
                          <div className="d-flex flex-row align-items-center mb-3">
                            <FaLock className="me-3" />
                            <div class="form-outline flex-fill mb-0">
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                  setPassword(e.target.value);
                                }}
                                required
                              />
                            </div>
                          </div>

                          <div className="button-div">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ backgroundColor: "#386bc0" }}
                            >
                              Login
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary mt-3"
                              onClick={() => {
                                navigate("/forget-password");
                              }}
                              style={{ backgroundColor: "#386bc0" }}
                            >
                              Forget Password
                            </button>
                            <p className="mt-2">
                              New User ?
                              <span color="#386bc0">
                                <Link
                                  to={"/register"}
                                  style={{ textDecoration: "none" }}
                                >
                                  {" "}
                                  Register
                                </Link>
                              </span>
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/012/335/181/non_2x/mobile-shopping-concept-a-man-and-a-woman-buy-things-in-the-online-store-through-a-big-smartphone-e-commerce-and-online-shopping-illustration-in-flat-style-vector.jpg"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
