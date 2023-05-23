import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
// for redirecting user to same page where it requested access we use useLocation
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [wait, setWait] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // setting time interval to display spinner

    const interval = setInterval(() => {
      setWait((prev) => --prev);
    }, 500);

    // notifying the user

    if (wait === 0) {
      toast.error("Login first");
      navigate(`/${path}`, {
        state: location.pathname, // for redirecting user to same page where it requested access
        // basically state property ke andar hmara current path aa jayega jisko login ke tym pe access karlenge
      });
    }
    return () => clearInterval(interval);
  }, [wait, navigate, location, path]);

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center flex-column "
        style={{ height: "60vh" }}
      >
        <h2>Loading...</h2>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
