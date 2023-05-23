import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AdminMenu from "../../components/DashboardMenus/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Forms/CategoryForm";
import { Modal } from "antd";

const CreateCategory = ({ title }) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetID, setTargetID] = useState("");

  // category creation function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/v1/categories/create-category`, {
        name,
      });
      if (data.success) {
        toast.success(data.message);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  //  category fetch function
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`/api/v1/categories/all-categories`);
      console.log(data);
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  // delete function
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/categories/delete-category/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  // update function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/categories/update-category/${targetID}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(data.message);
        setTargetID("");
        setUpdatedName("");
        setIsModalOpen(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
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

          <div className="col-md-9">
            <h1>Categories</h1>
            <div className="mt-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                category={name}
                setCategory={setName}
              />
            </div>
            <div className="mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((item) => (
                    <>
                      <tr>
                        <td key={item._id}>{item.name}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setIsModalOpen(true);
                              setUpdatedName(item.name);
                              setTargetID(item._id);
                            }}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-danger ms-3"
                            onClick={() => {
                              handleDelete(item._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Modal
            onCancel={() => setIsModalOpen(false)}
            open={isModalOpen}
            footer={null}
          >
            <CategoryForm
              category={updatedName}
              setCategory={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
