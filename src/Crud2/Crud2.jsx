import React, { useEffect, useState } from "react";
import UserModal from "./UserModal";
import { deleteUser, getUsers, updateUser } from "../ApiHandlers/Crud1Api";
import SingleRow from "./SingleRow";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import toastMessage from "../utils/toastMessage";
const HEADERDATA = ["S.no", "Name", "UserName", "Email", "Phone Number", ""];
const Crud2 = () => {
  const [usersList, setUsersList] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [userModal, setUserModal] = useState({
    show: false,
    isEdit: false,
    data: null,
  });
  const [deleteInfo, setDeleteInfo] = useState({
    show: false,
    id: null,
  });

  const handleUserModal = (show = false, isEdit = false, data = null) => {
    setUserModal({
      show: show,
      isEdit: isEdit,
      data: data,
    });
  };
  const handleDeleteInfo = (id = null, show = false) => {
    setDeleteInfo({
      show: show,
      id: id,
    });
  };
  useEffect(() => {
    setPageLoader(true);
    getUsers()
      .then((res) => setUsersList(res?.data))
      .catch((err) => console.log(err))
      .finally(() => setPageLoader(false));
  }, []);

  const handleConfirmDelete = () => {
    setPageLoader(true);
    deleteUser(deleteInfo.id)
      .then(() => {
        toastMessage("user deleted successfully", "success");
        const temp = usersList.filter((curElem) => curElem.id != deleteInfo.id);
        console.log(temp, "temp");
        setUsersList(temp);
        handleDeleteInfo();
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          toastMessage(err.response.data.message);
        } else {
          toastMessage("something went wrong");
        }
      });
  };
  const handleUpdateUser = (payload, id) => {
    setPageLoader(true);
    updateUser(payload, id)
      .then(() => {
        const temp = [...usersList];
        const index = temp.findIndex((curElem) => curElem.id === id);
        if (index > -1) {
          temp[index] = payload;
          console.log(temp, "temp");
          setUsersList(temp);
          handleUserModal();
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          toastMessage(err.response.data.message);
          handleUserModal();
        } else {
          toastMessage("something went wrong");
          handleUserModal();
        }
      })
      .finally(() => {
        setPageLoader(false);
      });
  };
  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleUserModal}
        >
          Add User
        </button>
      </div>
      <div className="listing">
        <table class="table">
          <thead>
            <tr>
              {HEADERDATA.map((heading, idx) => (
                <th className="col" key={idx}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersList?.length
              ? usersList.map((curRowData, idx) => (
                  <SingleRow
                    key={idx}
                    index={idx}
                    curRowData={curRowData}
                    handleDeleteInfo={handleDeleteInfo}
                    handleUserModal={handleUserModal}
                  />
                ))
              : "no data found"}
          </tbody>
        </table>
      </div>
      {userModal.show && (
        <UserModal
          showModal={userModal.show}
          isEdit={userModal.isEdit}
          data={userModal.data}
          handleUserModal={handleUserModal}
          handleUpdateUser={handleUpdateUser}
        />
      )}
      {deleteInfo.show && (
        <DeleteConfirmationModal
          showModal={deleteInfo.show}
          handleDeleteInfo={handleDeleteInfo}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default Crud2;
