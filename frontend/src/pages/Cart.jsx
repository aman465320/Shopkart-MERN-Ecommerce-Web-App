import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "../context/global";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";

// payment dropin
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Cart = ({ title }) => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  console.log(auth);
  const navigate = useNavigate();

  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  // find total cost of cart
  const handleTotal = () => {
    try {
      let totalCost = 0;
      {
        cart?.map((item) => {
          totalCost += item.price;
        });
      }

      // return total value formatted on basis of currency
      return totalCost.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // remove cart item
  const handleRemove = async (prodId) => {
    try {
      let updatedCart = [...cart];
      // find the index of element whose id is equal to prodId
      let targetRemove = updatedCart.findIndex((item) => item._id === prodId);
      // remove this index item
      updatedCart.splice(targetRemove, 1);
      // set the new array to original arrray
      setCart(updatedCart);
      // set update cart items to local storage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  // payment gateway token
  const getPaymentToken = async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`/api/v1/products/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      // clear cart
      localStorage.removeItem("cart");
      setCart([]);
      // navigate to orders dashboard
      navigate("/dashboard/user/orders");
      toast.success("Order Placed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPaymentToken();
  }, [auth?.user]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-md-12" style={{ fontSize: "0.8em" }}>
            <h3 className="text-center mt-2">
              {cart.length === 0 && `No Items`}
              {cart.length >= 1 &&
                auth?.token &&
                `Yayy! you have ${cart.length} products in your cart ${
                  auth?.token && auth?.user.name
                }`}
              {cart.length >= 1 &&
                !auth?.token &&
                `Yayy! you have ${cart.length} products in your cart . Now Login to checkout`}
            </h3>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-7 mt-3">
            {cart.length > 0 && (
              <h3
                className="text-center"
                style={{ textDecoration: "underline" }}
              >
                Items List
              </h3>
            )}
            {cart?.map((item) => (
              <div className="row card flex-row m-2 p-2 shadow" key={item._id}>
                <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                  <img
                    src={`/api/v1/products/product-image/${item._id}`}
                    className="card-img-top product-image img-responsive"
                    style={{ maxHeight: "150px", width: "100%" }}
                    alt={item.name}
                  />
                </div>
                <div className="col-md-6 col-sm-12 flex-column card-body d-flex justify-content-center  col-md-5 ">
                  <p className="card-title " style={{ fontWeight: "bold" }}>
                    {item.name}
                  </p>

                  <p> Price : ₹ {item.price}</p>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ width: "5.8em" }}
                    onClick={() => {
                      handleRemove(item._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-5 mt-3" style={{ fontSize: "1em" }}>
            <h3 className="text-center" style={{ textDecoration: "underline" }}>
              Cart Details
            </h3>

            <h3>
              <span style={{ color: "#3cb13c" }}>Total</span> : {handleTotal()}
            </h3>
            {auth?.user?.address && (
              <>
                <h3 className="mt-3">Deliever to</h3>
                <p style={{ fontWeight: "600" }}> {auth?.user?.address} </p>
              </>
            )}
            {!auth?.token && (
              <>
                <div className="mt-3">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      navigate("/login", { state: "/cart" });
                    }}
                  >
                    Please Login to Checkout
                  </button>
                </div>
              </>
            )}
            <div className="mt-2">
              {!clientToken || cart?.length === 0 || !auth?.user ? (
                ""
              ) : (
                <>
                  {/* payment menu */}
                  <DropIn
                    options={{
                      authorization: clientToken,
                    }}
                    onInstance={(instance) => {
                      setInstance(instance);
                      console.log(instance);
                    }}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    style={{ backgroundColor: "#386bc0" }}
                    disabled={loading || !instance || !auth?.user}
                  >
                    {loading ? "Wait ..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
