import React from "react";
import { Helmet } from "react-helmet";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Search = ({ title }) => {
  const [search, setSearch] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {search?.results.length === 0
              ? "No match found"
              : `Found ${search.results.length} items`}
          </h6>
          <div className="d-flex flex-wrap flex-row mt-4 justify-content-center">
            {search?.results.map((item) => (
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

export default Search;
