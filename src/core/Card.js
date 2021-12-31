import React, { useState } from "react";
import ImageHelper from "./helper/ImageHeper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { Redirect } from "react-router-dom";

const Card = ({
  product,
  addToCart = true,
  removeCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const addCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getRedirect = (aredirect) => {
    if (aredirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showCartButton = (addToCart) => {
    if (addToCart) {
      return (
        <button
          onClick={addCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      );
    }
  };

  const showRemoveCart = (removeCart) => {
    if (removeCart) {
      return (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(true);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      );
    }
  };

  return (
    <div className="card text-white bg-dark border border-info text-center">
      <div className="card-header lead">{product.name}</div>
      <div className="card-body">
        {getRedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {product.description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">
          $ {product.price}
        </p>
        <div className="row">
          <div className="col-12">{showCartButton(addToCart)}</div>
          <div className="col-12">{showRemoveCart(removeCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
