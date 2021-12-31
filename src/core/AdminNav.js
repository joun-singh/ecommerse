import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <div className="card">
      <div className="card-header bg-dark text-white text-center">
        <h4>Admin Navigations</h4>
      </div>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link text-success" to="/admin/create/category">
            Create Category
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link text-success" to="/admin/create/product">
            Create Products
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link text-success" to="/admin/products">
            Manage Products
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link text-success" to="/admin/orders">
            Manage Products
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNav;
