import React from "react";

const SingleSkillRow = ({
  curRowData,
  index,
  handleDeleteInfo,
  handleSkillsModalInfo,
}) => {
  const { skill_name, expertise, skill_description, skill_level } = curRowData;
  return (
    <tr>
      <td>{skill_name}</td>
      <td scope="row">{skill_description}</td>
      <td>{skill_level}</td>
      <td>{expertise}</td>
      <td>
        <div className="icons d-flex gap-2 pointer">
          <i className="fa fa-eye" />
          <i
            class="fa fa-pen-to-square"
            onClick={() => {
              handleSkillsModalInfo(true, true, curRowData, index);
            }}
          />
          <i
            className="fa fa-trash"
            onClick={() => {
              handleDeleteInfo(true, index);
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default SingleSkillRow;
