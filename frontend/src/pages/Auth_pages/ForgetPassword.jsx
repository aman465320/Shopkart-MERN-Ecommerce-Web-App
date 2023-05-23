import axios from "axios";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ForgetPassword = ({ title }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secret, setSecret] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, newPassword, secret);
    try {
      const { data } = await axios.post(`/api/v1/users/forget-password`, {
        email,
        newPassword,
        secret,
      });
      if (data.success) {
        toast.success(data.message);
        // redirecting to login
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed");
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="register">
        <h1>Reset Password </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
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
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputSecret"
              placeholder="Enter Secret"
              value={secret}
              onChange={(e) => {
                setSecret(e.target.value);
              }}
              required
            />
          </div>
          <div className="button-div">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
