import React from "react";

const DeleteConfirmationModal = ({
  toggleModal,
  showDeleteModal,
  handleConfirmDelete,
  text = "Are you sure you want to delete this user ",
}) => {
  return (
    <>
      <div
        className="modal"
        tabindex="-1"
        role="dialog"
        className={`modal ${showDeleteModal ? "show" : ""}`}
        style={{ display: showDeleteModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <h3 className="text-center font-weight-light">{text}</h3>

            <div className="modal-body text-center">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal-backdrop fade ${showDeleteModal ? "show" : ""}`}
        style={{ display: showDeleteModal ? "block" : "none" }}
      ></div>
    </>
  );
};

export default DeleteConfirmationModal;
