import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/global";
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

      <div className="register">
        <h1>Login </h1>

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
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="button-div" >
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={() => {
                navigate("/forget-password");
              }}
            >
              Forget Password
            </button>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <p>New User ? </p>
          <button className="btn btn-primary" type="button" onClick={() => {navigate("/register")}}>Sign Up</button>
          </div>
        </form>
        
      </div>
    </>
  );
};

export default Login;
