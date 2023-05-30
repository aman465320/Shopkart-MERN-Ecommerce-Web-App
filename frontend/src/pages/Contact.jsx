import React from "react";
import { Helmet } from "react-helmet";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RiMapPin2Fill } from "react-icons/ri";
import "../styles/pages_styles/contact.css";
const Contact = ({ title }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="container">
        <h1>Contact Us</h1>
        <p>Feel free to get in touch with us.</p>

        <div className="row">
          <div className="col-md-6">
            <h3>Address</h3>

            <p>
              <RiMapPin2Fill className="me-2" /> Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Minus, eum.
            </p>
          </div>
          <div className="col-md-6">
            <h3>Contact Information </h3>
            <p>
              <MdEmail className="me-2" /> Email: info@shopkart.com
            </p>
            <p>
              <BsFillTelephoneFill className="me-2" /> Phone: +1 123 456 7890
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
