import React, { useState, useEffect } from "react";
import { isAuthenticate } from "../auth/helper";
import AdminNav from "../core/AdminNav";
import Base from "../core/Base";
import {
  getAllCategory,
  getAllProduct,
  singleProduct,
  updateProduct,
} from "./helper/adminapicall";

const UpdateProduct = ({ match }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categories: [],
    category: "",
    photo: "",
    createdProduct: "",
    loading: false,
    error: false,
    getaRedirect: false,
    formData: "",
  });

  const { user, token } = isAuthenticate();

  const {
    name,
    description,
    price,
    stock,
    category,
    categories,
    photo,
    loading,
    error,
    formData,
    getaRedirect,
    createdProduct,
  } = product;

  const preload = (productID) => {
    singleProduct(productID).then((res) => {
      if (res.error) {
        setProduct({ ...product, error: res.error });
      } else {
        setProduct({
          ...product,
          name: res.name,
          description: res.description,
          price: res.price,
          stock: res.stock,
          category: res.category._id,
          formData: new FormData(),
        });
      }
    });
    getAllCategory()
      .then((res) => {
        if (res.error) {
          setProduct({ ...product, error: res.error });
        } else {
          //console.log(res);
          setProduct({
            categories: res,
            formData: new FormData(),
          });
          //console.log(categories);
        }
      })
      .catch((err) => {
        setProduct({ ...product, error: true });
      });
  };

  useEffect(() => {
    console.log(match);
    preload(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    //
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setProduct({ ...product, [name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setProduct({ ...product, loading: true });
    updateProduct(match.params.productId, user._id, token, formData)
      .then((res) => {
        setProduct({
          ...product,
          loading: false,
          error: false,
          name: res.name,
          description: res.description,
          price: res.price,
          stock: res.stock,
          createdProduct: res.name,
        });
      })
      .catch((error) => {
        console.log(error);
        setProduct({ ...product, error: true });
      });
  };

  return (
    <Base
      title="Update Product"
      description="Manage Product"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-9">
          <div className="card p-4">
            <form>
              <div className="row">
                <div className="col-md-6">Image preview TODO</div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="btn btn-block btn-success">
                      <input
                        type="file"
                        name="photo"
                        placeholder="Choose a file"
                        accept="image"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={handleChange("name")}
                  value={name}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="textarea"
                  className="form-control"
                  name="description"
                  onChange={handleChange("description")}
                  value={description}
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={handleChange("price")}
                  name="price"
                  value={price}
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  className="form-control"
                  placeholder="Category"
                  onChange={handleChange("category")}
                >
                  <option>Select category</option>
                  {categories &&
                    categories.map((cat, index) => (
                      <option
                        key={index}
                        value={cat._id}
                        selected={cat._id == category ? "selected" : ""}
                      >
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  onChange={handleChange("stock")}
                  value={stock}
                />
              </div>
              <div className="form-group">
                <button
                  onClick={submitForm}
                  className="btn btn-outline-primary rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
