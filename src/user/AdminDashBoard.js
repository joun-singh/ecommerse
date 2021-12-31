import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/helper";
//import { isAuthenticate } from "../auth/helper/index";
import Base from "../core/Base";
import AdminNav from "../core/AdminNav";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticate();

  const rightSideBar = () => {
    return (
      <div className="card">
        <h4 className="card-header text-center">Admin information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name : </span>
            {name}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email : </span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger">Admin Area </span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Admin Dashboard"
      description="Manage all produsts"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>
        <div className="col-md-9">{rightSideBar()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
