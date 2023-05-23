import React from "react";
import { Link, NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <>
      <div className="text-center ">
        <div className="list-group ">
          <h1>
            <Link
              to="/dashboard/user"
              style={{ textDecoration: "none", color: "black" }}
            >
              User Dashboard
            </Link>
          </h1>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action "
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action "
          >
            Profile
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
