import React, { useState } from "react";

const Model = (props) => {
  const [show, setShow] = useState("");

  return (
    <div
      className="modal"
      role="dialog"
      style={{ display: props.isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => props.onHide()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => props.onHide()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
