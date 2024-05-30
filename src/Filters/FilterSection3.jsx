import React, { Fragment } from "react";
const CATEGORY_OPTIONS = ["smartphones", "laptos", "cosmetics", "motorcycles"];
const GENDER_OPTIONS = ["male", "female", "any", "other"];
const INTERESTS = ["cricket", "chess", "football", "hockey"];

const FilterSection3 = ({ handleSelectFilter, filters2 }) => {
  return (
    <div>
      <div className="filterSelect">
        <h5>Category</h5>
        <select name="category" onChange={(e) => handleSelectFilter(e)}>
          <option value="" disabled selected>
            Select Any category{" "}
          </option>
          {CATEGORY_OPTIONS.map((val) => (
            <option value={val}>{val}</option>
          ))}
        </select>
        <h5>Gender</h5>
        {GENDER_OPTIONS?.map((val, idx) => (
          <Fragment key={idx}>
            <input
              type="radio"
              name="gender"
              value={val}
              checked={filters2?.gender === val}
              onClick={(e) => handleSelectFilter(e)}
            />
            <p className="text-capitalize">{val}</p>
          </Fragment>
        ))}
        <h5>Interests</h5>
        {INTERESTS?.map((val, idx) => (
          <Fragment key={idx}>
            <input
              type="checkbox"
              name="interests"
              value={val}
              onChange={(e) => handleSelectFilter(e)}
            />
            <p className="text-capitalize">{val}</p>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default FilterSection3;
