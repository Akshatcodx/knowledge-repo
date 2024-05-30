import React from "react";

const FilterSection1 = ({ setCategoryFilter, categoryFilter }) => {
  console.log(categoryFilter);
  const categories = [
    "smartphones",
    "laptops",
    "home-decoration",
    "groceries",
    "skincare",
    "fragrances",
  ];
  return (
    <div>
      <div className="filterContainer">
        {categories?.map((cat, idx) => (
          <button
            key={idx}
            style={{ background: categoryFilter === cat && "orange" }}
            onClick={() => setCategoryFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSection1;
