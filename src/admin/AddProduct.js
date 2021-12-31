import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import AdminNav from "../core/AdminNav";
import { getAllCategory, createProduct } from "./helper/adminapicall";
import { isAuthenticate } from "../auth/helper";

const AddProduct = () => {
  //console.log("AUTH", isAuthenticate());
  const { user, token } = isAuthenticate();
  //console.log(token);
  const [values, setValues] = useState({
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
  } = values;

  const getCategory = () => {
    getAllCategory()
      .then((response) => {
        if (response.error) {
          setValues({ ...values, error: response.error });
        } else {
          setValues({
            ...values,
            categories: response,
            formData: new FormData(),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleChange = (name) => (event) => {
    //
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    createProduct(user._id, token, formData)
      .then((res) => {
        setValues({
          ...values,
          loading: false,
          error: false,
          name: "",
          description: "",
          price: "",
          stock: "",
          photo: "",
          createdProduct: res.name,
        });
      })
      .catch((error) => {
        console.log(error);
        setValues({ ...values, error: true });
      });
  };

  const successMessage = () => {
    // console.log("CREATED", createdProduct);
    if (createdProduct) {
      return (
        <div className="alert alert-success">
          Product <b>"{createdProduct}"</b> added successfully{" "}
        </div>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return <div className="alert alert-danger">Product not added. </div>;
    }
  };

  const addProductForm = () => {
    return (
      <div className="card p-4">
        <form>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                type="file"
                onChange={handleChange("photo")}
                name="photo"
                placeholder="Choose a file"
                accept="image"
              />
            </label>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange("name")}
              name="name"
              value={name}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="textarea"
              className="form-control"
              onChange={handleChange("description")}
              name="description"
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
              onChange={handleChange("category")}
              placeholder="Category"
            >
              <option>Select category</option>
              {categories &&
                categories.map((cat, index) => (
                  <option key={index} value={cat._id}>
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
              onChange={handleChange("stock")}
              name="stock"
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
    );
  };

  return (
    <Base
      title="Add product"
      description="Create new product"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-9">
          {successMessage()}
          {errorMessage()}
          {addProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
