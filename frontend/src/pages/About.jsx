import React from "react";
import { Helmet } from "react-helmet";
const About = ({ title }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="bg-light">
        <div className="container py-5">
          <div className="row h-100 align-items-center py-5">
            <div className="col-md-6 col-sm-12">
              <h1>Who are we ?</h1>
              <p className="lead mb-0">
                Shopkart is a leading e-commerce company offering a wide range
                of products. With a user-friendly interface, secure payments,
                and a vast network of sellers, Shopkart provides a seamless
                shopping experience. They prioritize efficient logistics and
                customer satisfaction.
              </p>
            </div>
            <div className="col-md-6 col-sm-8 d-flex justify-content-center align-items-center">
              <img
                src="https://bootstrapious.com/i/snippets/sn-about/illus.png"
                alt
                style={{ width: "70%" }}
                className="img-fluid img-responsive"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
