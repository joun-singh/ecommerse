import React, { useState } from "react";
import Base from "../core/Base";
import AdminNav from "../core/AdminNav";
import { isAuthenticate } from "../auth/helper";
import { addCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticate();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    addCategory(user._id, token, { name })
      .then((res) => {
        setSuccess(true);
        setName("");
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  const successMessage = () => {
    if (success) {
      return (
        <h4 className="alert alert-success">Caterogy created successfull</h4>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return (
        <h4 className="alert alert-danger">
          Somthing Wrong. please try again!
        </h4>
      );
    }
  };

  return (
    <Base
      title="Category"
      description="Add new category for product"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-9">
          <div className="card p-4">
            <div className="card-header">
              {successMessage()}
              {errorMessage()}
            </div>
            <form>
              <div className="form-group my-2">
                <label className="lead">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="For ex. Summer"
                  autoFocus
                  required
                  onChange={handleChange}
                  value={name}
                />
                <button
                  onClick={submitForm}
                  className="btn btn-outline-primary my-3 rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
