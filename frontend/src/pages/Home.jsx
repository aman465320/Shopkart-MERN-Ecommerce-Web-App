import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "../context/global";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Filters/Prices";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Home = ({ title }) => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`/api/v1/categories/all-categories`);
      console.log(data);
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  // getting all products on home page
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/all-products`);
      setProducts(data.allProducts);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    }
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // filter the products
  const handleFilter = (isChecked, id) => {
    // get the checked array in status
    let status = [...checked];
    // if it is checked then push the id in the status array
    if (isChecked) {
      status.push(id);
    }
    // else remove the id from status by matching each id of status with given id and reqriting the status array
    else {
      status = status.filter((cat) => cat !== id);
    }
    // finally set the checked array to status array
    setChecked(status);
  };

  // get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/products/filter-product`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // clear filter function
  const handleClear = async () => {
    try {
      // reload window to remove filters
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div >
        {/* category filter */}
        <div className="carousal-div mt-3 mb-5">
          <div className="container-fluid">
            <Carousel
              infiniteLoop
              autoPlay
              showStatus={false}
              showThumbs={false}
              dynamicHeight
            >
              <div>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg"
                  alt="it1"
                />
              </div>
              <div>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/004/707/493/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg"
                  alt="it1"
                />
              </div>
              <div>
                <img
                  className="img img-responsive"
                  src="https://static.vecteezy.com/system/resources/previews/011/871/820/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg"
                  alt=""
                />
              </div>
            </Carousel>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-3 ">
            <h3 className="text-center">Filter by Category</h3>
            <hr />
            <div className="d-flex flex-wrap flex-column">
              {categories?.map((item) => (
                <Checkbox
                  className="filter-check"
                  key={item._id}
                  onChange={(e) => handleFilter(e.target.checked, item._id)}
                >
                  {item.name}
                </Checkbox>
              ))}
            </div>
            {/* price filter */}

            <h3 className="mt-5 text-center">Filter by Price</h3>
            <hr />
            <div className="d-flex flex-wrap flex-column">
              {/* refer ant design radio */}
              {/* set the radio to be equal to value passed from the array of price */}
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((item) => (
                  <div key={item._id}>
                    <Radio value={item.array} className="radio-check">
                      {item.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="btn-div">
              <button
                onClick={handleClear}
                className=" mt-3 btn btn-danger text-center"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="col-md-9 ">
            {/* {JSON.stringify(checked, null, 5)}
            {JSON.stringify(radio, null, 5)} */}
            <h1 className="text-center mt-4">All products</h1>
            <div className="d-flex flex-wrap flex-row align-items-center justify-content-center ">
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
      </div>
    </>
  );
};

export default Home;
