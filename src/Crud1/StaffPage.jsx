import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteStaffById, getAllStaff } from "../ApiHandlers/Crud1Api";
import StaffCard from "./StaffCard";
import PageLoader from "../Loader/PageLoader";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import ViewModal from "./ViewModal";
import toastMessage from "../utils/toastMessage";

const StaffPage = () => {
  const [loader, setLoader] = useState(true);
  const [staffList, setStaffList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [viewModalData, setViewModalData] = useState({
    showViewModal: true,
    viewModalData: null,
  });
  const [id, setId] = useState(null);
  useEffect(() => {
    setLoader(true);
    getAllStaff()
      .then((res) => setStaffList(res?.data))
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, []);
  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const toggleViewModal = () => {
    setViewModalData({
      showViewModal: false,
      data: null,
    });
  };
  const handleDeleteModal = (id) => {
    setShowDeleteModal(!showDeleteModal);
    setId(id);
  };
  const handleViewModal = (data) => {
    setViewModalData({
      showViewModal: true,
      viewModalData: data,
    });
  };
  const handleConfirmDelete = () => {
    setLoader(true);
    deleteStaffById(id)
      .then(() => {
        setShowDeleteModal(false);
        const temp = staffList.filter((curElem) => curElem.id !== id);
        setStaffList(temp);
        toastMessage("Staff deleted successfully", "success");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };
  return (
    <>
      <div>
        {loader && <PageLoader />}
        <Link to="/staff/add">
          <button type="button" className="btn btn-secondary">
            Add Staff
          </button>
        </Link>
        <div className="listing">
          {staffList.length > 0 ? (
            staffList.map((curStaffItem, index) => (
              <StaffCard
                curStaffItem={curStaffItem}
                key={index}
                handleDeleteModal={handleDeleteModal}
                handleViewModal={handleViewModal}
              />
            ))
          ) : (
            <p>No Staff Found</p>
          )}
        </div>
      </div>
      {showDeleteModal && (
        <DeleteConfirmationModal
          showDeleteModal={showDeleteModal}
          toggleModal={toggleDeleteModal}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
      {/* {viewModalData.showViewModal && (
        <ViewModal
          showModal={viewModalData.showViewModal}
          viewModalData={viewModalData.viewModalData}
          toggleViewModal={toggleViewModal}
        />
      )} */}
    </>
  );
};

export default StaffPage;
