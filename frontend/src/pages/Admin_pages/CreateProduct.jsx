import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AdminMenu from "../../components/DashboardMenus/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const CreateProduct = ({ title }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipped, setShipped] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  //  category fetch function
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

  // product creation function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // since our data also contains image so make a new form data
      const sentData = new FormData();
      sentData.append("name", name);
      sentData.append("description", description);
      sentData.append("price", price);
      sentData.append("quantity", quantity);
      sentData.append("image", image);
      sentData.append("shipped", shipped);
      sentData.append("category", category);
      console.log(sentData);

      const { data } = await axios.post(
        `/api/v1/products/create-product`,
        sentData
      );
      console.log(data);
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

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="container-fluid mt-2 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9 ">
            <h1>Create product</h1>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="w-75">
                <div className="mt- mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select Category"
                    size="large"
                    showSearch
                    className="form-select mb-3"
                    // when we select something then onchange is called
                    onChange={(value) => {
                      setCategory(value);
                    }}
                  >
                    {/* map all the categories that we have in db */}
                    {categories.map((item) => (
                      <Option key={item._id} value={item._id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="mt-3 mb-3">
                  <label className="btn btn-secondary col-md-12">
                    {image ? image.name : "Upload Photo"}
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => setImage(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>

                <img className="img-fluid" src={image} alt="" />

                <div className="mt-3 mb-3">
                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    className="form-control"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-3 mb-3">
                  <textarea
                    name=""
                    value={description}
                    className="form-control"
                    placeholder="Enter Description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>

                <div className="mt-3 mb-3">
                  <input
                    type="text"
                    placeholder="Enter Price"
                    value={price}
                    className="form-control"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-3 mb-3">
                  <input
                    type="text"
                    placeholder="Enter Quantity"
                    value={quantity}
                    className="form-control"
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </div>

                <div className="mt-3 mb-3">
                  <Select
                    placeholder="Shipped"
                    size="large"
                    bordered={false}
                    showSearch
                    className="form-select"
                    onChange={(value) => {
                      setShipped(value);
                    }}
                  >
                    <Option value="0">Yes</Option>
                    <Option value="1">No</Option>
                  </Select>
                </div>

                <div className="mb-3 mt-3">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
