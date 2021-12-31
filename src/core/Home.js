import React, { useState, useEffect } from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  //const { product } = product;
  const preload = () => {
    getProducts().then((result) => {
      if (result.error) {
        setError(true);
      } else {
        setProduct(result);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to my T-shirt Store">
      <h1 className="text-white">Welcome home</h1>
      <div className="row">
        {product &&
          product.map((prod, index) => {
            return (
              <div className="col-md-4" key={index}>
                <Card product={prod} />
              </div>
            );
          })}
      </div>
    </Base>
  );
}
