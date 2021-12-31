import React from "react";
import { withRouter } from "react-router";

import Nav from "./nav";

const Base = ({
  title = "My title",
  description = "My description",
  className = "bg-dark text-white py-4",
  children,
}) => {
  return (
    <div>
      <Nav />
      <div className="container-fluid">
        <div className="bg-dark text-center text-white p-2">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
        <footer className="bg-dark text-white mt-auto py-3">
          <div className="container-fluid bg-success text-center">
            <h4>If you got any question feel free to ask?</h4>
            <button className="btn btn-lg btn-warning">Contact US</button>
          </div>
          <div className="container">
            <span className="text-muted">Great place to buy T-shirt</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Base;
