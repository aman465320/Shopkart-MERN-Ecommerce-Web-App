import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import UserMenu from "../../components/DashboardMenus/UserMenu";
import { useAuth } from "../../context/global";
import axios from "axios";
import { toast } from "react-hot-toast";
const Profile = ({ title }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  // customs
  const [auth, setAuth] = useAuth();

  // get user profile at initial time
  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`/api/v1/users/update-profile`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data.success) {
        toast.success(data.message);

        // setting auth to updated user
        setAuth({ ...auth, user: data?.user });

        // updating local storage
        let temp = localStorage.getItem("auth");
        temp = JSON.parse(temp);
        temp.user = data.user;
        localStorage.setItem("auth", JSON.stringify(temp));
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
      <div className="container-fluid mt-2 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <h1>Profile</h1>
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
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Email"
                  value={email}
                  disabled
                  // disbling because on the basis of email only we can find the user that has to be updated
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
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
                />
              </div>
              <div className="submit-div">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
