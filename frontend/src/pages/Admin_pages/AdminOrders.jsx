import React from "react";
import { Helmet } from "react-helmet";
import AdminMenu from "../../components/DashboardMenus/AdminMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/global";
import moment from "moment";
import { Select } from "antd";
import { toast } from "react-hot-toast";
// the function is almost same as orders.jsx function
const AdminOrders = ({ title }) => {
  const [adminOrders, setAdminOrders] = useState([]);

  const [status, setStatus] = useState([
    "Not processed",
    "Processing",
    "Shipped",
    "Delieved",
    "Cancelled",
  ]);
  const [updatedStatus, setUpdatedStatus] = useState("");

  const [auth, setAuth] = useAuth();

  const getAdminOrders = async () => {
    try {
      const { data } = await axios.get(`/api/v1/users/admin-orders`);
      setAdminOrders(data?.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getAdminOrders();
    }
  }, [auth?.token]);

  const handleStatusUpdate = async (statusValue, oid) => {
    try {
      const { data } = await axios.put(`/api/v1/users/update-order/${oid}`, {
        updatedStatus: statusValue,
      });
      console.log(data?.order);
      getAdminOrders();
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

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
          <h1 className="text-center">All orders</h1>

          {adminOrders.map((item, idx) => {
            return (
              <>
                <div className="mt-5" key={idx + 1}>
                  <div>
                    <div>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Buyer</th>
                            <th scope="col">&nbsp; Status</th>
                            <th scope="col">Date</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">{idx + 1}</th>
                            <td>{item?.buyer?.name}</td>
                            <td>
                              {/* status options for admin */}
                              <Select
                                bordered={false}
                                onChange={(val) => {
                                  handleStatusUpdate(val, item._id);
                                }}
                                defaultValue={item?.status}
                              >
                                {status.map((st, i) => {
                                  return (
                                    <>
                                      <Select.Option key={i} value={st}>
                                        {st}
                                      </Select.Option>
                                    </>
                                  );
                                })}
                              </Select>
                            </td>
                            <td>{moment(item?.createdAt).calendar()}</td>
                            <td>
                              {item?.payment.success ? "Success" : "Failed"}
                            </td>
                            <td>{item?.products.length}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="col-md-9">
                    {item?.products?.map((product, prodIdx) => (
                      <div
                        className="row card flex-row m-3 p-3"
                        key={product._id}
                      >
                        <h5>{prodIdx + 1}</h5>
                        <div className="col-md-4 d-flex justify-content-center align-items-center">
                          <img
                            src={`/api/v1/products/product-image/${product._id}`}
                            className="card-img-top product-image img-responsive"
                            style={{ height: "200px" }}
                            alt={product.name}
                          />
                        </div>

                        <div className="flex-column card-body d-flex col-md-5">
                          <p
                            className="card-title "
                            style={{ fontWeight: "bold" }}
                          >
                            {product.name}
                          </p>
                          <p className="card-text">
                            {product.description.substring(0, 50) + "..."}
                          </p>
                          <p> Price : ₹ {product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
