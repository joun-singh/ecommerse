import React, { Fragment } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";

import { isAuthenticate, signout } from "../auth/helper/index";

const activeLink = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#2fd45b",
    };
  } else {
    return {
      color: "#FFFFFF",
    };
  }
};

const Nav = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link style={activeLink(history, "/")} className="nav-link" to="/">
            Homes
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={activeLink(history, "/cart")}
            className="nav-link"
            to="/cart"
          >
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={activeLink(history, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            style={activeLink(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            Admin Dashboard
          </Link>
        </li>
        {!isAuthenticate() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={activeLink(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={activeLink(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Signin
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticate() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Nav);
