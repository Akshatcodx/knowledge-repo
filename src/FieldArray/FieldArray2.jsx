import React, { Fragment, useState } from "react";

const FieldArray2 = () => {
  const [languages, setLanguages] = useState([
    {
      language: "",
      level: "",
    },
  ]);

  const handleLangChange = (e, idx, field) => {
    const { value } = e.target;
    const temp = [...languages];
    temp[idx][field] = value;
    console.log(temp, "temp");
    setLanguages([...temp]);
  };
  const handleAddMore = () => {
    const index = languages.findIndex(
      (curElem) => curElem.language === "" || curElem.level === ""
    );
    if (index === -1) {
      // way1
      // const temp = [...languages];
      // temp.push({ language: "", level: "" });
      // setLanguages(temp);
      setLanguages([
        ...languages,
        {
          language: "",
          level: "",
        },
      ]);
    }
  };
  const handleRemove = (idx) => {
    const temp = [...languages];
    temp.splice(idx, 1);
    setLanguages(temp);
  };
  return (
    <div>
      {languages.map((curLang, idx) => (
        <Fragment key={idx}>
          <input
            type="text"
            value={curLang.language}
            onChange={(e) => {
              handleLangChange(e, idx, "language");
            }}
          />
          <select
            onChange={(e) => {
              handleLangChange(e, idx, "level");
            }}
          >
            <option value="">Select level</option>
            <option value="begineer">begineer</option>
            <option value="intermediate">Intermediatte</option>
            <option value="advance">Advance</option>
          </select>
          {languages.length !== 1 && (
            <button btn btn-primary onClick={() => handleRemove(idx)}>
              Remove
            </button>
          )}
        </Fragment>
      ))}
      <button className="btn btn-secondary" onClick={handleAddMore}>
        Add More
      </button>
    </div>
  );
};

export default FieldArray2;
