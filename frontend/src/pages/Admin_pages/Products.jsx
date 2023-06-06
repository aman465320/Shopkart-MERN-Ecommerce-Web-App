import React from "react";
import AdminMenu from "../../components/DashboardMenus/AdminMenu";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
const Products = ({ title }) => {
  const [products, setProducts] = useState([]);
  const [img, setImg] = useState(null);
  //   get all products
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/all-products`);
      //   console.log(data);
      if (data.success) {
        setProducts(data.allProducts);
        // toast.success(data.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  // initial product fetching
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products.map((item) => (
              <Link
                key={item._id}
                to={`/dashboard/admin/particular-product/${item._id}`}
                className="product-item"
              >
                <div
                  className="card m-3"
                  style={{ width: "18rem", height: "540px" }}
                >
                  <img
                    src={`/api/v1/products/product-image/${item._id}`}
                    className="card-img-top "
                    style={{ maxHeight: "50%" }}
                    alt={item.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
