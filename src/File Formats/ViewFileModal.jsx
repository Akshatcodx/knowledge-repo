import React, { useState } from "react";

const ViewFileModal = ({ file, showModal, handleCloseModal }) => {
  const [loader, setLoader] = useState(true);
  console.log(file, "this is file");
  return (
    <>
      <div
        tabindex="-1"
        role="dialog"
        className={`modal ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <h3>File View Modal</h3>
            {loader ? "...file is loading" : null}
            <iframe
              // src={file}
              src={`https://docs.google.com/gview?url=${file}&embedded=true`}
              // frameborder="0"
              width="300"
              height="200"
              onLoad={() => setLoader(false)}
            />
            <button
              className="btn btn-secondary"
              onClick={() => {
                handleCloseModal();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      ></div>
    </>
  );
};

export default ViewFileModal;
