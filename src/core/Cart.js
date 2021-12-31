import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripCheckout from "./helper/stiripCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const cartSection = () => {
    return (
      <div>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            addToCart={false}
            removeCart={true}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Happy Shopping">
      <div className="row text-center">
        <div className="col-6">{cartSection()}</div>
        <div className="col-6">
          <StripCheckout
            products={products}
            setReload={setReload}
            reload={reload}
          />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
