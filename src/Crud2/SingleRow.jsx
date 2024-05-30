import React from "react";

const SingleRow = ({
  curRowData,
  index,
  handleDeleteInfo,
  handleUserModal,
}) => {
  const { id, name, username, phone, email } = curRowData;
  return (
    <tr>
      <td>{index + 1}</td>
      <td scope="row">{name && name}</td>
      <td>{username && username}</td>
      <td>{email && email}</td>
      <td>{phone && phone}</td>
      <td>
        <div className="icons d-flex gap-2 pointer">
          <i className="fa fa-eye" />
          <i
            class="fa fa-pen-to-square"
            onClick={() => {
              // (show,isEdit,data)
              handleUserModal(true, true, curRowData);
            }}
          />
          <i
            className="fa fa-trash"
            onClick={() => handleDeleteInfo(id, true)}
          />
        </div>
      </td>
    </tr>
  );
};

export default SingleRow;
