import React, { useState } from "react";
const GENDER_OPTIONS = ["male", "female", "any", "other"];

const Scenario2 = () => {
  const [gender, setGender] = useState("");
  const handleRadio = (e) => {
    const { value } = e.target;
    if (value !== gender) {
      setGender(value);
    } else {
      setGender("");
    }
  };

  return (
    <div>
      {GENDER_OPTIONS.map((curGender, idx) => (
        <div key={idx}>
          <label htmlFor={`gen${idx}`}>
            <img
              style={{ width: "30px" }}
              src={curGender === gender ? "checked.png" : "uncheck.png"}
            />
          </label>

          <input
            id={`gen${idx}`}
            type="radio"
            className="visually-hidden"
            name="gender"
            value={curGender}
            onClick={(e) => handleRadio(e)}
            // checked={curGender === gender}
          />
          <p className="text-capitalize">{curGender}</p>
        </div>
      ))}
    </div>
  );
};

export default Scenario2;
