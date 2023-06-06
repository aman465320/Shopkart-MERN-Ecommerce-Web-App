import React from "react";
import AdminMenu from "../../components/DashboardMenus/AdminMenu";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
const Products = ({ title }) => {
  const [products, setProducts] = useState([]);
  const [img, setImg] = useState(null);
  const navigate = useNavigate();
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

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const productsToDisplay = products.slice(startIndex, endIndex);

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
          <div className="d-flex flex-wrap flex-row align-items-center justify-content-center">
            {productsToDisplay.map((item) => (
              <div
                key={item._id}
                to={`/dashboard/admin/particular-product/${item._id}`}
                className="card m-3 p-2 shadow text-decoration-none"
                style={{ width: "20rem", height: "450px" }}
              >
                <img
                  src={`/api/v1/products/product-image/${item._id}`}
                  alt={item.name}
                  className="card-img-top product-image img-responsive m-auto"
                  style={{ maxHeight: "200px", width: "90%" }}
                />
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
                  <button
                    className="btn btn-primary d-flex align-items-center  prod-btn"
                    style={{ width: "3.5em", fontSize: "1em" }}
                    onClick={() => {
                      navigate(
                        `/dashboard/admin/particular-product/${item._id}`
                      );
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            responsive
            current={currentPage}
            pageSize={pageSize}
            total={products.length}
            className="text-center"
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Products;
