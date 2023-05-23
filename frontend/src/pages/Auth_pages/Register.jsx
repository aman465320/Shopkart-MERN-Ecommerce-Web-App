import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

      <div className="register">
        <h1>Register </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
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
            />
          </div>
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
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputSecret"
              placeholder="Enter your favourite food ?"
              value={secret}
              onChange={(e) => {
                setSecret(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
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
          <div className="mb-3">
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
          <div className="submit-div">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>

            <p className="mt-2">Already a User ?</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
