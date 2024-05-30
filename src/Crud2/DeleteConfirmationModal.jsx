import React from "react";

const DeleteConfirmationModal = ({
  showModal,
  handleDeleteInfo,
  handleConfirmDelete,
}) => {
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
            <h3>Are You Sure you want to delete this user?</h3>
            <button className="btn btn-secondary" onClick={handleDeleteInfo}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleConfirmDelete}>
              Confirm Delete
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

export default DeleteConfirmationModal;
