import React from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "../../context/global";
import AdminMenu from "../../components/DashboardMenus/AdminMenu";
const AdminDashboard = ({ title }) => {
  const [auth] = useAuth();
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
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{auth?.user?.name}</h5>
                <p className="card-text">{auth?.user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
