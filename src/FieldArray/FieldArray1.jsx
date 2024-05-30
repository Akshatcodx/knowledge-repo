import React, { Fragment, useState } from "react";

const FieldArray1 = () => {
  const [preferences, setPreferences] = useState([""]);
  const [empty, setEmpty] = useState(false);

  const handleAddMore = () => {
    const index = preferences.findIndex((curElem) => curElem === "");
    if (index === -1) {
      setPreferences([...preferences, ""]);
    } else {
      setEmpty(true);
    }
  };
  const isAnyFieldEmpty = () => {
    const index = preferences.findIndex((curElem) => curElem === "");
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  };
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const temp = [...preferences];
    temp[index] = value;
    setPreferences(temp);
    setEmpty(false);
  };
  const handleRemove = (idx) => {
    const temp = [...preferences];
    temp.splice(idx, 1);
    setPreferences(temp);
  };
  return (
    <div>
      <h5>Add Languages Known</h5>
      <div className="listing">
        {preferences.map((curField, index) => (
          <Fragment key={index}>
            <input
              placeholder="Add Language"
              className="form-field"
              value={curField}
              onChange={(e) => {
                handleInputChange(e, index);
              }}
            />
            {preferences.length !== 1 && (
              <button
                disabled={preferences.length === 1}
                className={`btn btn-secondary ${
                  preferences.length === 1 && "not-allowed"
                }`}
                onClick={() => {
                  handleRemove(idx);
                }}
              >
                Remove
              </button>
            )}
          </Fragment>
        ))}
      </div>
      <br />
      {empty && <p style={{ color: "red" }}>Previous field can't be empty</p>}
      <button
        className="mt-4"
        disabled={isAnyFieldEmpty()}
        onClick={handleAddMore}
      >
        Add More
      </button>
    </div>
  );
};

export default FieldArray1;
