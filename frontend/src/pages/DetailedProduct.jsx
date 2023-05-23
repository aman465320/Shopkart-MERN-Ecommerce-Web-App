import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import { List } from "antd";
import { useAuth } from "../context/global";
import { FaUserAlt } from "react-icons/fa";
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
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`/api/v1/products/product-image/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width="300px"
            style={{ objectFit: "scale-down" }}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className>Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : ₹ {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>

          <button
            className="btn btn-warning ms-2"
            onClick={() => {
              setCart([...cart, product]);
              toast.success("Item added to cart");
              // to prevent login data form reload we use local storage
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <hr />

      {auth?.token ? (
        <>
          <div className="d-flex justify-content-center align-items-center flex-column mt-5">
            <form onSubmit={handleReview}>
              <div className="mb-2">
                <h1 className="text-center">Add a review</h1>
                <textarea
                  className="text p-3"
                  name="review"
                  id=""
                  cols="60"
                  rows="3"
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

      {reviews.length > 0 && (
        <>
          <div className="mt-3">
            <div className="p-2" style={{ width: "50%" }}>
              <div>
                <h2 className="mb-">All reviews</h2>
                <List
                  itemLayout="horizontal"
                  dataSource={reviews}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <>
                            <FaUserAlt className="me-1" />
                            {item.customer.name}
                          </>
                        }
                        description={item.reviewText}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
        </>
      )}

      <div className="row">
        <h3 className="mt-3">Similar Products:</h3>
        {similarProducts.length === 0 && (
          <p className="text-center">"No similar products found"</p>
        )}
        <div className="d-flex flex-wrap flex-row ">
          {similarProducts.map((item) => (
            <div
              key={item._id}
              className="card m-3"
              style={{ width: "18rem", height: "540px" }}
            >
              <img
                src={`/api/v1/products/product-image/${item._id}`}
                style={{ maxHeight: "50%" }}
                className="card-img-top product-image img-responsive"
                alt={item.name}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">
                  {item.description.substring(0, 50) + "..."}
                </p>
                <p> ₹ {item.price}</p>
              </div>
              <div className="d-flex justify-content-center align-items-center mb-3">
                <button
                  className="btn btn-primary ms-2"
                  onClick={() => {
                    navigate(`/detailed-product/${item._id}`);
                  }}
                >
                  View Details
                </button>
                <button
                  className="btn btn-warning ms-2"
                  onClick={() => {
                    setCart([...cart, item]);
                    toast.success("Item added to cart");
                    // to prevent login data form reload we use local storage
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, item])
                    );
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
