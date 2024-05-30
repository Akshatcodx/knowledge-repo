import React, { useState } from "react";

const FieldArray3 = () => {
  const [preferences, setPreferences] = useState({
    languages: [{ language: "", level: "" }],
    titles: [{ title: "", rating: "" }],
  });
  const handleAdd = (field) => {
    const value1 = field === "languages" ? "language" : "title";
    const value2 = field === "languages" ? "level" : "rating";

    const isAnyFieldEmpty = preferences[field].findIndex(
      (curElem) => curElem[value1] === "" || curElem[value2] === ""
    );
    console.log(isAnyFieldEmpty);
    if (isAnyFieldEmpty < 0) {
      const temp = [...preferences[field]];
      temp.push({ [value1]: "", [value2]: "" });
      setPreferences({
        ...preferences,
        [field]: [...temp],
      });
    }
  };
  const handleRemove = (field, index) => {
    const temp = [...preferences[field]];
    temp.splice(index, 1);
    setPreferences({
      ...preferences,
      [field]: [...temp],
    });
  };
  const handleChange = (field, index, e, property) => {
    const object = field === "languages" ? "language" : "title";
    const { value } = e.target;
    const temp = [...preferences[field]];
    console.log(temp);
    temp[index][property] = value;
    setPreferences({
      ...preferences,
      [field]: [...temp],
    });
  };
  const onSubmit = (d) => {
    const payload = JSON.parse(JSON.stringify(preferences));
    payload = {
      ...payload,
      languages: preferences.languages,
      title: preferences.titles,
    };

    console.log(payload);
  };
  console.log(preferences, "preferences");
  return (
    <div>
      <div className="language">
        <h5>Languages</h5>
        {preferences?.languages?.map((curLang, index, arr) => (
          <div className="d" key={index}>
            <input
              type="text"
              value={curLang.language}
              onChange={(e) => {
                handleChange("languages", index, e, "language");
              }}
            />
            <input
              type="text"
              value={curLang.level}
              onChange={(e) => {
                handleChange("languages", index, e, "level");
              }}
            />
            <button
              onClick={() => {
                handleRemove("languages", index);
              }}
              disabled={arr.length === 1}
              className={arr.length === 1 && "disabled"}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            handleAdd("languages");
          }}
        >
          Add Another Language
        </button>
      </div>

      {/* titles */}
      <div className="titles" style={{ marginTop: "20px" }}>
        <h5>Titles</h5>
        {preferences?.titles?.map((curTitle, index, arr) => (
          <div className="d" key={index}>
            <input
              type="text"
              value={curTitle.title}
              onChange={(e) => {
                handleChange("titles", index, e, "title");
              }}
            />
            <input
              type="text"
              value={curTitle.rating}
              onChange={(e) => {
                handleChange("titles", index, e, "rating");
              }}
            />
            <button
              onClick={() => {
                handleRemove("titles", index);
              }}
              disabled={arr.length === 1}
              className={arr.length === 1 && "disabled"}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            handleAdd("titles");
          }}
        >
          Add Another Title
        </button>
      </div>
      {/* titles */}
    </div>
  );
};

export default FieldArray3;
