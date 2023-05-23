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
          <div className="d-flex flex-wrap flex-row mt-5">
            {products.map((item) => (
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
      </div>
    </>
  );
};

export default Category;
