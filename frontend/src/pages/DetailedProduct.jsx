import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import { List } from "antd";
import { useAuth } from "../context/global";
import { FaUserAlt } from "react-icons/fa";

import "../styles/index.css";

const DetailedProduct = ({ title }) => {
  const [auth, setAuth] = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [review, setReview] = useState("");
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.id) {
      getProduct();
      getProductReviews();
    }
  }, [params?.id]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/particular-product/${params.id}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar products
  const getSimilarProducts = async (pid, catid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/similar-products/${pid}/${catid}`
      );
      setSimilarProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // get all reviews of a particular product
  const getProductReviews = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-reviews/${params.id}`
      );
      setReviews(data?.allReviews);
    } catch (error) {
      console.log(error);
    }
  };

  // add a review
  const handleReview = async () => {
    try {
      console.log(review);
      const { data } = await axios.post(
        `/api/v1/products/add-review/${params.id}`,
        {
          review,
        }
      );

      console.log(data);

      // getProductReviews();

      if (data?.success) {
        toast.success("added successfully");
      } else {
        toast.error("error 1");
      }
    } catch (error) {
      console.log("error 2");
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {/* {JSON.stringify(reviews, null, 5)} */}
      <div className="row container mt-2" style={{ width: "100%" }}>
        <h1 className="text-center my-5">Product Details</h1>
        <div className="col-md-5">
          <img
            src={`/api/v1/products/product-image/${product._id}`}
            className="card-img-top mb-3"
            alt={product.name}
            height="270px"
            width="300px"
            style={{ objectFit: "scale-down" }}
          />
        </div>
        <div className="col-md-7">
          <p>
            <span className="product-property">Name : </span>
            {product.name}
          </p>
          <p>
            <span className="product-property">Description : </span>
            {product.description}
          </p>
          <p>
            <span className="product-property">Price : </span>₹{product.price}
          </p>
          <p>
            <span className="product-property">Category : </span>
            {product?.category?.name}
          </p>
          <p>
            <button
              className="btn btn-warning"
              onClick={() => {
                setCart([...cart, product]);
                toast.success("Item added to cart");
                // to prevent login data form reload we use local storage
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
              }}
              style={{ backgroundColor: "#f4d06f" }}
            >
              Add to Cart
            </button>
          </p>
        </div>
      </div>
      <hr />

      {auth?.token ? (
        <>
          <div className="d-flex justify-content-center align-items-center flex-column mt-5">
            <form onSubmit={handleReview}>
              <div className="mb-2 form-group">
                <h1 className="text-center ">Add a review</h1>
                <textarea
                  className="text p-2 form-control"
                  name="review"
                  id=""
                  cols="55"
                  rows="4"
                  placeholder="Enter Review"
                  value={review}
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </>
      ) : (
        <h1 className="text-center">
          {" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
            style={{ color: "blue" }}
          >
            Login
          </span>{" "}
          to add a review
        </h1>
      )}
      <hr />
      {reviews.length > 0 && (
        <>
          <div className="my-5 review-container">
            <div className="p-2 border-danger" style={{ width: "100%" }}>
              <h2 className="text-center">All reviews</h2>
              <div className="review-card-container">
                {reviews.map((item) => (
                  <div
                    key={item._id}
                    className="card m-3 p-2 shadow card-div"
                    style={{ width: "18rem", minHeight: "15rem" }}
                  >
                    <div className="card-body ">
                      <h5 className="review-title mt-3">
                        {item.customer.name}
                      </h5>
                      <p className="review-text">{item.reviewText}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      <hr />
      <div className="row">
        <h3 className="mt-3">Similar Products:</h3>
        {similarProducts.length === 0 && (
          <p className="text-center">"No similar products found"</p>
        )}
        <div className="d-flex flex-wrap flex-row justify-content-center">
          {similarProducts.map((item) => (
            <div
              key={item._id}
              className="card m-3 p-2 shadow"
              style={{ width: "20rem", height: "450px" }}
            >
              {/* <div className="img-div"> */}
              <img
                src={`/api/v1/products/product-image/${item._id}`}
                className="card-img-top product-image img-responsive m-auto"
                alt={item.name}
                style={{ maxHeight: "200px", width: "90%" }}
              />
              {/* </div> */}
              <div className="card-body d-flex justify-content-center flex-column">
                <h5
                  className="card-title"
                  style={{ fontSize: "1em", fontWeight: "bold" }}
                >
                  {item.name}
                </h5>
                <p className="card-text" style={{ fontSize: "1rem" }}>
                  {item.description.substring(0, 50) + "..."}
                </p>
                <p style={{ fontWeight: "Bold" }}>
                  <span className="price">Price : </span>₹ {item.price}
                </p>
              </div>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <button
                  className="btn btn-primary ms-2 prod-btn"
                  onClick={() => {
                    navigate(`/detailed-product/${item._id}`);
                  }}
                  style={{ backgroundColor: "#3E7CB1" }}
                >
                  View Details
                </button>
                <button
                  className="btn btn-warning ms-2 prod-btn"
                  onClick={() => {
                    setCart([...cart, item]);
                    toast.success("Item added to cart");
                    // to prevent login data form reload we use local storage
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, item])
                    );
                  }}
                  style={{
                    backgroundColor: "#F4D06F",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
    </>
  );
};

export default DetailedProduct;
