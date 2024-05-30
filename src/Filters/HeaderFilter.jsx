import React from "react";
let timerId;

const HeaderFilter = ({ headerFilters, setHeaderFilters }) => {
  const handleChangeName = (value) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      setHeaderFilters({ ...headerFilters, ["name"]: value });
    }, 700);
  };
  return (
    <div>
      <h5>Name</h5>
      <input type="text" onChange={(e) => handleChangeName(e.target.value)} />
      <select
        value={headerFilters?.sortBy}
        onChange={(e) =>
          setHeaderFilters({
            ...headerFilters,
            ["sortBy"]: e.target.value,
          })
        }
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
};

export default HeaderFilter;
