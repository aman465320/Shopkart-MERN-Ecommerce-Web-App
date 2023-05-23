import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/DashboardMenus/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
const SingleProduct = ({ title }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipped, setShipped] = useState("");
  const [image, setImage] = useState("");
  const [catId, setCatId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/particular-product/${params.id}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipped(data.product.shipped);
      setCatId(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`/api/v1/categories/all-categories`);
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      image && productData.append("image", image);
      productData.append("category", catId);
      const { data } = axios.put(
        `/api/v1/products/update-product/${params.id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product updated");

        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("check image upload");
    }
  };

  //   delete product
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `/api/v1/products/delete-product/${params.id}`
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  //   product delete

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                value={catId}
                onChange={(value) => {
                  setCatId(value);
                }}
              >
                {categories?.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-secondary col-md-12">
                  {image ? image.name : "Upload Photo"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipped "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipped(value);
                  }}
                  value={shipped ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
