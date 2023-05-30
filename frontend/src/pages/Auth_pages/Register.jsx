import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaUserSecret } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { RiMapPin2Fill } from "react-icons/ri";
const Register = ({ title }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [secret, setSecret] = useState("");
  const navigate = useNavigate();

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`/api/v1/users/register`, {
        name,
        email,
        password,
        phone,
        address,
        secret,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
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
                        Sign up
                      </p>

                      <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-3">
                          <FaUserAlt className="me-3" />
                          <div class="form-outline flex-fill mb-0">
                            <input
                              type="name"
                              className="form-control"
                              id="exampleInputName"
                              placeholder="Name"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                              required
                              autoComplete="off"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <MdEmail className="me-3" />
                          <div class="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              className="form-control"
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
                              id="exampleInputPassword"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <FaUserSecret className="me-3" />
                          <div class="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputSecret"
                              placeholder="What's your favourite food ?"
                              value={secret}
                              onChange={(e) => {
                                setSecret(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <BsFillTelephoneFill className="me-3" />
                          <div class="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputPhone"
                              placeholder="Phone number"
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <RiMapPin2Fill className="me-3" />
                          <div class="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputAddress"
                              placeholder="Address"
                              value={address}
                              onChange={(e) => {
                                setAddress(e.target.value);
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="submit-div">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ backgroundColor: "#386bc0" }}
                          >
                            Submit
                          </button>

                          <p className="mt-2">
                            Already a User ?
                            <span color="#386bc0">
                              <Link
                                to={"/login"}
                                style={{ textDecoration: "none" }}
                              >
                                {" "}
                                Login
                              </Link>
                            </span>
                          </p>
                        </div>
                      </form>
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

export default Register;
