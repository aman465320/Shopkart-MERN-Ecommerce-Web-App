import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

const Category = ({ title }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  const params = useParams();
  const navigate = useNavigate();

  const getProductsFromCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/category-products/${params.id}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.id) getProductsFromCategory();
  }, [params?.id]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div>
        <div className="container">
          <h2 className="text-center">{category.name} Category</h2>
          <h5 className="text-center mb-5">
            {products.length === 0
              ? "No products found"
              : `Found ${products.length} products`}
          </h5>
          <div className="d-flex flex-wrap flex-row mt-5 justify-content-center">

            {products.map((item) => (
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
      </div>
    </>
  );
};

export default Category;
