import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../../auth/helper";
import { emptyCart, loadCart } from "./cartHelper";
import StripeCheckout from "react-stripe-checkout";
import { API } from "../../backend";
import createOrder from "./orderHelper";
const StripCheckoutBtn = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: "",
    success: false,
    error: false,
    address: "",
  });

  const user = isAuthenticate() && isAuthenticate().user._id;
  const token = isAuthenticate() && isAuthenticate().token;

  const getFinalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makepaymentS = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-type": "application/json",
    };

    return fetch(`${API}/payment/stripe`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const showStripButton = () => {
    return isAuthenticate() ? (
      <StripeCheckout
        name="Buy Tshirt"
        description={products.description}
        amount={getFinalAmount() * 100}
        currency="USD"
        token={makepaymentS}
        email=""
        stripeKey="pk_test_51JJf86SHVIGcP2GsLbN74S8qHe4loascMfrgKedBldhPB6XuktjUHv8KRyu4KDuGMHzyzxiPVm1jiaN1THzxbv6I00gZHIXzf6"
        shippingAddress
        billingAddress
      >
        <button class="btn btn-success">Pay with Strip</button>
      </StripeCheckout>
    ) : (
      <Link to="/signin">
        <button class="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h1>StripCheckout {getFinalAmount()}</h1>
      <div>{showStripButton()}</div>
    </div>
  );
};

export default StripCheckoutBtn;
