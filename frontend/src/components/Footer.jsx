import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className="footer">
        <h3 className="text-center">All rights reserved &copy; Aman Mathur</h3>
        <p className="text-center">
          <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>
        </p>
      </div>
    </>
  );
};

export default Footer;
