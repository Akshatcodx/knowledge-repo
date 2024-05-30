import React from "react";
import { useNavigate } from "react-router-dom";

const StaffCard = ({
  handleViewModal,
  curStaffItem,
  setShowDeleteModal,
  handleDeleteModal,
}) => {
  const { fullName, image, role, permissions, phone, email, id } = curStaffItem;
  const navigate = useNavigate();
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="img">{/* <img src={image} />A */}</div>
          <h5 className="card-title">{fullName && fullName}</h5>
          {email && <p>Email : {email}</p>}
          {phone && <p>Phone:{phone}</p>}
          {role && <p>Role: {role}</p>}
          {/* <a href="#" class="btn btn-primary">
            Go somewhere
          </a> */}
          <div className="actions d-flex gap-2 pointer">
            <i
              className="fa-solid fa-trash"
              onClick={() => handleDeleteModal(id)}
            ></i>
            <i
              className="fa-regular fa-eye"
              onClick={() => {
                handleViewModal(curStaffItem);
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square"
              onClick={() => navigate(`/staff/edit/${id}`)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
