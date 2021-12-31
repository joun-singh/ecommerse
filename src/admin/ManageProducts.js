import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
import AdminNav from "../core/AdminNav";
import Base from "../core/Base";
import { deleteProduct, getAllProduct } from "./helper/adminapicall";
import Model from "./Model";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { user, token } = isAuthenticate();

  const allProducts = () => {
    getAllProduct()
      .then((res) => {
        setProducts(res);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    allProducts();
  }, []);

  const deleteSingleProduct = (productID) => {
    deleteProduct(productID, user._id, token)
      .then((res) => {
        allProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onHide = () => {
    setIsOpen(false);
  };

  return (
    <Base
      title="All products"
      description="Manage products here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-12">
              <h4 className="text-center text-white my-3">
                Total {products.length} products
              </h4>

              {products.map((product, index) => {
                return (
                  <div key={index} className="row text-center mb-2 for-border">
                    <div className="col-4">
                      <h4 className="text-white text-left">{product.name}</h4>
                    </div>
                    <div className="col-4">
                      <button
                        className="btn btn-success"
                        onClick={() => setIsOpen(true)}
                      >
                        <span className="">Update</span>
                      </button>
                    </div>
                    <div className="col-4">
                      <button
                        onClick={() => {
                          deleteSingleProduct(product._id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {isOpen ? <Model isOpen={isOpen} onHide={onHide} /> : <div></div>}
    </Base>
  );
};

export default ManageProducts;
