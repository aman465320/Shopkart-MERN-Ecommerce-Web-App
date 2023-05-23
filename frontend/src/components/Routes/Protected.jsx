import React from "react";

import { useState, useEffect} from "react";

// custom hook
import { useAuth } from "../../context/global";

// for nested routing use outlet
import { Outlet } from "react-router-dom";

import axios from "axios";
import Spinner from "../Spinner";

const Protected = () => {
  const [userExists, setUSerExists] = useState(false); //this ok comes from backend
  const [auth, setAuth] = useAuth(); // custom hook to get user details

  useEffect(() => {
    const getUserDetails = async () => {
      // hitting the get user api
      const { data } = await axios.get(`/api/v1/users/user-dashboard`);
      if (data.ok) {
        setUSerExists(true);
      } else {
        setUSerExists(false);
      }
    };
    if (auth?.token) getUserDetails();
  }, [auth?.token]);

  //   nested routing
  return userExists ? <Outlet /> : <Spinner />;
};

export default Protected;
