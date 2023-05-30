import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import UserMenu from "../../components/DashboardMenus/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/global";

import moment from "moment";

const Orders = ({ title }) => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getMyOrders = async (req, res) => {
    try {
      const { data } = await axios.get(`/api/v1/users/my-orders`);
      setOrders(data?.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getMyOrders();
    }
  }, [auth?.token]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="mt-2 p-1">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <h1 className="text-center">My orders</h1>

            {orders.map((item, idx) => {
              return (
                <>
                  <div className="my-5">
                    <div>
                      <div>
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">S.No</th>
                              <th scope="col">Buyer</th>
                              <th scope="col"> &nbsp; Status</th>
                              <th scope="col">Date</th>
                              <th scope="col">Payment</th>
                              <th scope="col">Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">{idx + 1}</th>
                              <td>{item?.buyer?.name}</td>
                              <td>{item?.status}</td>
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

                    <div className="d-flex align-items-center justify-content-center flex-column">
                      {item?.products?.map((product, prodIdx) => (
                        <div
                          className="row card flex-row m-1 p-2 shadow"
                          style={{ width: "70%" }}
                          key={product._id}
                        >
                          <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                            <img
                              src={`/api/v1/products/product-image/${product._id}`}
                              className="card-img-top product-image img-responsive"
                              style={{ maxHeight: "150px", width: "100%" }}
                              alt={product.name}
                            />
                          </div>
                          <div className="col-md-6 col-sm-12 flex-column card-body d-flex justify-content-center  col-md-5 ">
                            <p
                              className="card-title "
                              style={{ fontWeight: "bold" }}
                            >
                              {product.name}
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
      </div>
    </>
  );
};

export default Orders;
