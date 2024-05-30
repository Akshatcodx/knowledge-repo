import React, { useState } from "react";
import SkillModal from "./SkillModal";
import SingleSkillRow from "./SingleSkillRow";
import DeleteConfirmationModal from "../Crud2/DeleteConfirmationModal";
const HEADERDATA = [
  "Skill Name",
  "Skill Description",
  "Skill Level",
  "Expertise",
  "",
];
const Crud3 = () => {
  const [skills, setSkills] = useState([]);
  const [deleteModalInfo, setDeleteInfo] = useState({
    show: false,
    deleteIndex: null,
  });
  const handleDeleteInfo = (show = false, deleteIndex = null) => {
    setDeleteInfo({
      show: show,
      deleteIndex: deleteIndex,
    });
  };
  const [skillsModalInfo, setSkillModalInfo] = useState({
    show: false,
    isEdit: false,
    data: null,
    index: null,
  });
  const handleSkillsModalInfo = (
    show = false,
    isEdit = false,
    data = null,
    index = null
  ) => {
    setSkillModalInfo({
      show: show,
      isEdit: isEdit,
      data: data,
      index: index,
    });
  };
  const handleDelete = () => {
    const temp = [...skills];
    temp.splice(deleteModalInfo.deleteIndex, 1);
    setSkills(temp);
    handleDeleteInfo();
  };
  const addUser = (dat) => {};
  return (
    <>
      <div>
        <button
          className="btn btn-secondary"
          onClick={() => {
            handleSkillsModalInfo(true);
          }}
        >
          Add Skills
        </button>
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
              {skills?.length
                ? skills.map((curRowData, idx) => (
                    <SingleSkillRow
                      key={idx}
                      index={idx}
                      handleDeleteInfo={handleDeleteInfo}
                      curRowData={curRowData}
                      handleSkillsModalInfo={handleSkillsModalInfo}
                      // handleDeleteInfo={handleDeleteInfo}
                      // handleUserModal={handleUserModal}
                    />
                  ))
                : "no data found"}
            </tbody>
          </table>
        </div>
      </div>
      {skillsModalInfo?.show && (
        <SkillModal
          showModal={skillsModalInfo.show}
          skills={skills}
          setSkills={setSkills}
          handleSkillsModalInfo={handleSkillsModalInfo}
          handleDeleteInfo={handleDeleteInfo}
          isEdit={skillsModalInfo.isEdit}
          data={skillsModalInfo.data}
          itemIndex={skillsModalInfo.index}
        />
      )}
      {deleteModalInfo.show && (
        <DeleteConfirmationModal
          showModal={deleteModalInfo.show}
          handleConfirmDelete={handleDelete}
          handleDeleteInfo={handleDeleteInfo}
        />
      )}
    </>
  );
};

export default Crud3;
